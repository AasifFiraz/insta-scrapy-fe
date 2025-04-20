import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
import { PostType } from '../types/postType';

export interface PostMixData {
  carousels: {
    count: number;
    percentage_change: number;
  };
  images: {
    count: number;
    percentage_change: number;
  };
  reels: {
    count: number;
    percentage_change: number;
  };
}

export interface InsightsResponse {
  filters: {
    days: number;
    type: string | null;
  };
  insights: {
    post_mix: PostMixData;
    // Other insights data fields omitted for brevity
  };
}

export const usePostMixData = (
  handle: string,
  days: number = 7,
  type?: PostType
) => {
  const [postMixData, setPostMixData] = useState<PostMixData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostMixData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get<InsightsResponse>(`/profile/${handle}/insights`, {
          params: {
            days,
            type
          }
        });

        if (response.data && response.data.insights && response.data.insights.post_mix) {
          setPostMixData(response.data.insights.post_mix);
        } else {
          throw new Error('Invalid response format: missing post_mix data');
        }
      } catch (err) {
        console.error('Error fetching post mix data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch post mix data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostMixData();
  }, [handle, days, type]);

  return { postMixData, isLoading, error };
};
