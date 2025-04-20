import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { PostType } from '../types/postType';

export interface EngagementDistributionData {
  comments: number;
  likes: number;
}

export interface InsightsResponse {
  filters: {
    days: number;
    type: string | null;
  };
  insights: {
    activity_ratio: {
      distribution: EngagementDistributionData;
      value: number;
    };
    // Other insights data fields omitted for brevity
  };
}

export const useEngagementDistribution = (
  handle: string,
  days: number = 7,
  type?: PostType
) => {
  const [distributionData, setDistributionData] = useState<EngagementDistributionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDistributionData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get<InsightsResponse>(`/profile/${handle}/insights`, {
          params: {
            days,
            type
          }
        });

        if (response.data && 
            response.data.insights && 
            response.data.insights.activity_ratio && 
            response.data.insights.activity_ratio.distribution) {
          setDistributionData(response.data.insights.activity_ratio.distribution);
        } else {
          throw new Error('Invalid response format: missing activity_ratio distribution data');
        }
      } catch (err) {
        console.error('Error fetching engagement distribution data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch engagement distribution data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistributionData();
  }, [handle, days, type]);

  return { distributionData, isLoading, error };
};
