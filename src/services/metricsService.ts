import { MetricType, TimeRange, MetricsResponse } from '../types/metrics';
import { getMockMetricsData } from '../data/metrics/mockMetricsService';

export const fetchMetricsData = async (
  handle: string,
  metric: MetricType,
  timeRange: TimeRange
): Promise<MetricsResponse> => {
  try {
    // TODO: Replace with actual API call when available
    return await getMockMetricsData(handle, metric, timeRange);
  } catch (error) {
    console.error('Error fetching metrics data:', error);
    return {
      data: [],
      error: 'Failed to load metrics data'
    };
  }
};