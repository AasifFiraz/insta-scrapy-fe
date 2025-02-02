import { useState, useEffect, useRef } from 'react';

interface ProfileData {
  username: string;
  fullName: string;
  followers: number;
  following: number;
  posts: number;
  biography: string;
  profilePic: string;
  isPrivate: boolean;
}

interface GrowthDataPoint {
  date: string;
  followerChange: number;
  newPosts: number;
  totalFollowers: number;
  totalPosts: number;
}

interface StatsData {
  engagement: {
    distribution: {
      comments: number;
      likes: number;
    };
    postMix: {
      carousels: number;
      images: number;
      reels: number;
    };
  };
  recentPosts: any[];
  totalFollowers: number;
  totalPosts: number;
}

interface UseProfileAnalyticsResult {
  profileData: ProfileData | null;
  growthData: GrowthDataPoint[];
  engagementData: StatsData | null;
  isLoading: boolean;
  error: string | null;
}

export const useProfileAnalytics = (handle: string): UseProfileAnalyticsResult => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([]);
  const [engagementData, setEngagementData] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseURL = process.env.NODE_ENV === "production" ? "https://postlyze.com" : "http://localhost:3000";
  
  // Use refs to track if the requests are in progress
  const profileRequestInProgress = useRef(false);
  const growthRequestInProgress = useRef(false);
  const statsRequestInProgress = useRef(false);

  // Use ref to track mounted state
  const isMounted = useRef(true);

  useEffect(() => {
    // Set mounted state
    isMounted.current = true;

    const fetchData = async () => {
      if (!handle) {
        console.error('No handle provided');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Profile info fetch
        if (!profileRequestInProgress.current) {
          profileRequestInProgress.current = true;
          const profileResponse = await fetch(`${baseURL}api/profile/${handle}`);
          
          if (!profileResponse.ok) {
            throw new Error(`Profile fetch failed: ${profileResponse.statusText}`);
          }
          
          const profileInfo = await profileResponse.json();

          // if (profileInfo.profilePic && isMounted.current) {
          //   try {
          //     const proxyResponse = await fetch(
          //       `https://postlyze.com/api/proxy/image?url=${encodeURIComponent(profileInfo.profilePic)}`
          //     );
              
          //     if (proxyResponse.ok) {
          //       const proxyData = await proxyResponse.json();
          //       profileInfo.profilePic = proxyData.imageUrl;
          //     } else {
          //       profileInfo.profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileInfo.fullName)}`;
          //     }
          //   } catch (proxyError) {
          //     profileInfo.profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileInfo.fullName)}`;
          //   }
          // }

          if (isMounted.current) {
            setProfileData(profileInfo);
          }
        }

        // Growth data fetch
        if (!growthRequestInProgress.current) {
          growthRequestInProgress.current = true;
          const growthResponse = await fetch(`${baseURL}/api/profile/${handle}/growth`);
          if (!growthResponse.ok) {
            throw new Error(`Growth data fetch failed: ${growthResponse.statusText}`);
          }
          const growthInfo = await growthResponse.json();
          
          // Make sure we're setting the actual array of growth data
          if (isMounted.current && Array.isArray(growthInfo)) {
            setGrowthData(growthInfo);
          }
        }

        // Stats fetch
        if (!statsRequestInProgress.current) {
          statsRequestInProgress.current = true;
          const statsResponse = await fetch(`${baseURL}/api/profile/${handle}/stats`);
          if (!statsResponse.ok) {
            throw new Error(`Stats fetch failed: ${statsResponse.statusText}`);
          }
          const statsInfo = await statsResponse.json();
          
          if (isMounted.current) {
            setEngagementData(statsInfo);
          }
        }

      } catch (err) {
        console.error('Error fetching analytics:', err);
        if (isMounted.current) {
          setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
        // Reset request flags
        profileRequestInProgress.current = false;
        growthRequestInProgress.current = false;
        statsRequestInProgress.current = false;
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted.current = false;
      profileRequestInProgress.current = false;
      growthRequestInProgress.current = false;
      statsRequestInProgress.current = false;
    };
  }, [handle]);

  // Add debug logging for state changes
  useEffect(() => {
    console.log('Current state:', {
      profileData,
      growthData,
      engagementData,
      isLoading,
      error
    });
  }, [profileData, growthData, engagementData, isLoading, error]);

  return { profileData, growthData, engagementData, isLoading, error };
};

export type { UseProfileAnalyticsResult, ProfileData, StatsData, GrowthDataPoint };
