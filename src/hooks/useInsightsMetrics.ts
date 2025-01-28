import { useState, useEffect } from 'react';
import { InsightsMetrics } from '../types/insights';
import { fetchInsightsMetrics } from '../services/insightsService';

export const useInsightsMetrics = (
  handle: string,
  startDate?: Date | null,
  endDate?: Date | null
) => {
  const [metrics, setMetrics] = useState<InsightsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInsightsMetrics(handle, startDate, endDate);
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError('Failed to load insights metrics');
        console.error('Error loading insights metrics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, [handle, startDate, endDate]);

  return { metrics, isLoading, error };
};