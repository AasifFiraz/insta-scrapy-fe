import { useState, useEffect } from 'react';
import { SavedAnalyticsData } from '../types/save';
import { getHormoziAnalytics } from '../data/profiles/hormozi';
import { isWithinInterval, parseISO, format } from 'date-fns';

export const useSavedAnalytics = (
  handle: string,
  startDate?: Date | null,
  endDate?: Date | null
) => {
  const [data, setData] = useState<SavedAnalyticsData>({
    totalFollowers: 0,
    followerGrowth: 0,
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    averageEngagement: 0,
    postTypes: [],
    postAngles: [],
    growthData: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get analytics data from mock service
        const analyticsData = getHormoziAnalytics();
        
        // Filter data based on date range if provided
        let filteredGrowthData = analyticsData.growthData;
        if (startDate && endDate) {
          filteredGrowthData = analyticsData.growthData.filter(point => {
            const pointDate = new Date(point.date);
            return isWithinInterval(pointDate, { start: startDate, end: endDate });
          });
        }

        // Ensure we have at least two data points for calculations
        if (filteredGrowthData.length < 2) {
          filteredGrowthData = analyticsData.growthData.slice(-2);
        }

        // Calculate metrics for the filtered period
        const firstPoint = filteredGrowthData[0];
        const lastPoint = filteredGrowthData[filteredGrowthData.length - 1];
        
        // Calculate growth metrics
        const followerGrowth = lastPoint.followers - firstPoint.followers;
        const averageEngagement = Math.round(
          filteredGrowthData.reduce((sum, point) => sum + point.engagement, 0) / 
          filteredGrowthData.length
        );

        // Calculate total engagement for the period
        const totalLikes = Math.round(averageEngagement * 0.7 * filteredGrowthData.length);
        const totalComments = Math.round(averageEngagement * 0.3 * filteredGrowthData.length);

        setData({
          totalFollowers: lastPoint.followers,
          followerGrowth,
          totalPosts: Math.round(filteredGrowthData.length * 0.7), // Assuming 70% posting frequency
          totalLikes,
          totalComments,
          averageEngagement,
          postTypes: analyticsData.postTypes,
          postAngles: analyticsData.postAngles,
          growthData: filteredGrowthData
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [handle, startDate, endDate]);

  return { data, isLoading, error };
};