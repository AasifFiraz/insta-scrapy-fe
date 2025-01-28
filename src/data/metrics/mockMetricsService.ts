import { MetricType, TimeRange, DataPoint, MetricsResponse } from '../../types/metrics';
import { generateMetricData } from './generators';

export const getMockMetricsData = async (
  handle: string,
  metric: MetricType,
  timeRange: TimeRange
): Promise<MetricsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: generateMetricData(metric, timeRange)
  };
};