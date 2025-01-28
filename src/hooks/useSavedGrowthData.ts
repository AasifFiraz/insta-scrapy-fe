import { useState, useEffect } from 'react';

interface GrowthDataPoint {
  date: string;
  followers: number;
  engagement: number;
}

export const useSavedGrowthData = (handle: string) => {
  const [data, setData] = useState<GrowthDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // Generate mock data for the past year
        const mockData = Array.from({ length: 365 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (365 - i));
          
          // Generate follower growth with some randomness
          const baseFollowers = 2000000 + (i * 1500);
          const randomFactor = 0.9 + Math.random() * 0.2;
          const followers = Math.round(baseFollowers * randomFactor);
          
          // Generate engagement based on followers
          const engagementRate = 0.05 + (Math.random() * 0.03);
          const engagement = Math.round(followers * engagementRate);

          return {
            date: date.toLocaleDateString('en-US', { 
              month: 'short',
              day: 'numeric'
            }),
            followers,
            engagement
          };
        });

        setData(mockData);
      } catch (error) {
        console.error('Error fetching growth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [handle]);

  return { data, isLoading };
};