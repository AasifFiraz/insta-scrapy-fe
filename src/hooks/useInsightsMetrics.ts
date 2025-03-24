import { useState, useEffect } from 'react';
import { InsightsMetrics } from '../types/insights';
import { fetchInsightsMetrics, getInsights, mapInsightsResponseToMetrics } from '../services/insightsService';
import { differenceInDays } from 'date-fns';
import { PostType } from '../types/postType';

export const useInsightsMetrics = (
  handle: string,
  startDate?: Date | null,
  endDate?: Date | null,
  postType: PostType | 'all' = 'all'
) => {
  const [metrics, setMetrics] = useState<InsightsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate days from endDate to startDate, default to 7 if not provided
        let days = 7;
        if (startDate && endDate) {
          const calculatedDays = differenceInDays(endDate, startDate);
          // Cap at 30 days for insights
          days = Math.min(calculatedDays, 30);
        }

        // Only pass postType if it's not 'all'
        const type = postType === 'all' ? undefined : postType;

        try {
          // First try to get data from the API
          const response = await getInsights(handle, days, type);
          const mappedMetrics = mapInsightsResponseToMetrics(response);
          setMetrics(mappedMetrics);
        } catch (apiError) {
          console.error('API error, falling back to fetchInsightsMetrics:', apiError);
          // Fallback to the previous implementation
          const data = await fetchInsightsMetrics(handle, startDate, endDate);
          setMetrics(data);
        }
      } catch (err) {
        setError('Failed to load insights metrics');
        console.error('Error loading insights metrics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, [handle, startDate, endDate, postType]);

  return { metrics, isLoading, error };
};