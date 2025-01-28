import { GrowthResponse } from '../types/growth';
import { TimeRange } from '../types/metrics';
import { getMockGrowthData } from '../data/growth/mockGrowthService';

export const fetchGrowthData = async (handle: string, timeRange: TimeRange): Promise<GrowthResponse> => {
  try {
    return await getMockGrowthData(handle, timeRange);
  } catch (error) {
    console.error('Error fetching growth data:', error);
    return {
      data: [],
      error: 'Failed to load growth data'
    };
  }
};