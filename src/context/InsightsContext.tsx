import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
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

  // Track filter changes with a ref to prevent duplicate API calls
  const previousFilters = React.useRef({ handle, postType, startDate, endDate });
  const isInitialRender = React.useRef(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        // Check if any of the filter values have actually changed
        const prevFilters = previousFilters.current;
        const filtersChanged = 
          prevFilters.handle !== handle ||
          prevFilters.postType !== postType ||
          prevFilters.startDate !== startDate ||
          prevFilters.endDate !== endDate ||
          fetchCounter > 0;

        // Skip the API call if this is just the component mounting with the same filters
        if (isInitialRender.current) {
          isInitialRender.current = false;
          // Still set loading state for UI consistency
          setIsLoading(true);
        } else if (!filtersChanged) {
          // Skip duplicate API calls if filters haven't changed
          console.log('InsightsContext: Skipping duplicate insights API call - no filter changes detected');
          return;
        } else {
          // Update loading state for filter changes
          setIsLoading(true);
          setError(null);
        }

        // Update the previous filters ref
        previousFilters.current = { handle, postType, startDate, endDate };

        // Calculate days from endDate to startDate, default to 7 if not provided
        let days = 7;
        if (startDate && endDate) {
          const calculatedDays = differenceInDays(endDate, startDate);
          // Cap at 30 days for insights
          days = Math.min(calculatedDays, 30);
        }

        // Only pass postType if it's not 'all'
        const type = postType === 'all' ? undefined : postType;

        console.log(`InsightsContext: Fetching insights with days=${days}, type=${type || 'all'}, handle=${handle}`);
        
        // Make a single API call
        const response = await getInsights(handle, days, type);
        const mappedMetrics = mapInsightsResponseToMetrics(response);
        setMetrics(mappedMetrics);
        console.log('InsightsContext: Successfully fetched and mapped metrics');
      } catch (err) {
        setError('Failed to load insights metrics');
        console.error('InsightsContext: Error loading insights metrics:', err);
      } finally {
        console.log(`InsightsContext: Done Fetching Insights for ${handle} with type=${postType}`);
        setIsLoading(false);
      }
    };

    // Only load metrics if we have a valid handle
    if (handle) {
      loadMetrics();
    } else {
      console.warn('InsightsContext: No handle provided, skipping metrics fetch');
    }
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
