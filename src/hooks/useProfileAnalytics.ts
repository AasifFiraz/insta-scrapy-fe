import { useState, useEffect, useRef } from 'react';
import { useTimeRange } from '../components/profile/context/TimeRangeContext';
import axiosInstance from '../utils/axios';

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

interface Post {
  id: string;
  title: string;
  thumbnail: string;
  createdAt: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
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
  recentPosts: Post[];
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
  const { timeRange } = useTimeRange();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([]);
  const [engagementData, setEngagementData] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
          const profileResponse = await axiosInstance.get(`/profile/${handle}`);
          
          if (isMounted.current) {
            setProfileData(profileResponse.data);
          }
        }

        // Growth data fetch
        if (!growthRequestInProgress.current) {
          growthRequestInProgress.current = true;
          const days = timeRange === '7D' ? 7 : timeRange === '28D' ? 28 : 90;
          const growthResponse = await axiosInstance.get(`/profile/${handle}/growth`, {
            params: { days }
          });
          
          if (isMounted.current && Array.isArray(growthResponse.data)) {
            setGrowthData(growthResponse.data);
          }
        }

        // Stats fetch
        if (!statsRequestInProgress.current) {
          statsRequestInProgress.current = true;
          const statsResponse = await axiosInstance.get(`/profile/${handle}/stats`);
          
          if (isMounted.current) {
            setEngagementData(statsResponse.data);
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
  }, [handle, timeRange]);

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
