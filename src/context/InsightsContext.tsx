import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { InsightsMetrics } from '../types/insights';
import { getInsights, mapInsightsResponseToMetrics } from '../services/insightsService';
import { differenceInDays } from 'date-fns';
import { PostType } from '../types/postType';

interface InsightsContextType {
  metrics: InsightsMetrics | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const InsightsContext = createContext<InsightsContextType | undefined>(undefined);

interface InsightsProviderProps {
  children: ReactNode;
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  postType?: PostType | 'all';
}

export const InsightsProvider: React.FC<InsightsProviderProps> = ({
  children,
  handle,
  startDate,
  endDate,
  postType = 'all'
}) => {
  const [metrics, setMetrics] = useState<InsightsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCounter, setFetchCounter] = useState(0);

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

        console.log(`Fetching insights with days=${days}, type=${type || 'all'}`);
        
        // Make a single API call
        const response = await getInsights(handle, days, type);
        const mappedMetrics = mapInsightsResponseToMetrics(response);
        setMetrics(mappedMetrics);
      } catch (err) {
        setError('Failed to load insights metrics');
        console.error('Error loading insights metrics:', err);
      } finally {
        console.log(`Done Fetching Insights for ${handle}`);
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, [handle, startDate, endDate, postType, fetchCounter]);

  const refetch = () => {
    setFetchCounter(prev => prev + 1);
  };

  const value = {
    metrics,
    isLoading,
    error,
    refetch
  };

  return (
    <InsightsContext.Provider value={value}>
      {children}
    </InsightsContext.Provider>
  );
};

export const useInsights = (): InsightsContextType => {
  const context = useContext(InsightsContext);
  if (context === undefined) {
    throw new Error('useInsights must be used within an InsightsProvider');
  }
  return context;
};
