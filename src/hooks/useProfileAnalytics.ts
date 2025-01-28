import { useState, useEffect } from 'react';

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

interface EngagementData {
  distribution: {
    likes: number;
    comments: number;
  };
  postMix: {
    reels: number;
    carousels: number;
    images: number;
  };
}

interface UseProfileAnalyticsResult {
  profileData: ProfileData | null;
  growthData: any[];
  engagementData: EngagementData | null;
  isLoading: boolean;
  error: string | null;
}

export const useProfileAnalytics = (handle: string): UseProfileAnalyticsResult => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [growthData, setGrowthData] = useState<any[]>([]);
    const [engagementData, setEngagementData] = useState<EngagementData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        if (!handle) {
          console.error('No handle provided');
          return;
        }
        
        console.log('Fetching data for handle:', handle);
        setIsLoading(true);
        setError(null);
  
        try {
          // Fetch profile info
          console.log('Fetching profile info...');
          const profileResponse = await fetch(`http://localhost:5000/api/profile/${handle}`);
          
          if (!profileResponse.ok) {
            throw new Error(`Profile fetch failed: ${profileResponse.statusText}`);
          }
          
          const profileInfo = await profileResponse.json();
  
          // If there's a profile picture, fetch it through the proxy
          if (profileInfo.profilePic) {
            try {
              const proxyResponse = await fetch(
                `http://localhost:5000/api/proxy/image?url=${encodeURIComponent(profileInfo.profilePic)}`
              );
              
              if (proxyResponse.ok) {
                const proxyData = await proxyResponse.json();
                profileInfo.profilePic = proxyData.imageUrl; // This will be a base64 data URL
              } else {
                console.error('Failed to proxy profile image');
                // Fallback to a default avatar if proxy fails
                profileInfo.profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileInfo.fullName)}`;
              }
            } catch (proxyError) {
              console.error('Error proxying profile image:', proxyError);
              // Fallback to a default avatar
              profileInfo.profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(profileInfo.fullName)}`;
            }
          }
  
          setProfileData(profileInfo);
  
          // Fetch growth data
          const growthResponse = await fetch(`http://localhost:5000/api/profile/${handle}/growth`);
          if (!growthResponse.ok) {
            throw new Error(`Growth data fetch failed: ${growthResponse.statusText}`);
          }
          const growthInfo = await growthResponse.json();
          setGrowthData(growthInfo);
  
          // Fetch stats
          const statsResponse = await fetch(`http://localhost:5000/api/profile/${handle}/stats`);
          if (!statsResponse.ok) {
            throw new Error(`Stats fetch failed: ${statsResponse.statusText}`);
          }
          const statsInfo = await statsResponse.json();
          setEngagementData({
            distribution: statsInfo.engagement.distribution,
            postMix: statsInfo.engagement.postMix
          });
  
        } catch (err) {
          console.error('Error fetching analytics:', err);
          setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [handle]);
  
    return { profileData, growthData, engagementData, isLoading, error };
  };
  