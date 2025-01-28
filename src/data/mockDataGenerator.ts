import { MetricType, TimeRange, DataPoint } from '../components/profile/charts/types';
import { samplePosts } from './samplePosts';

const generateFollowerData = (days: number): number[] => {
  const baseFollowers = 2500000; // 2.5M base followers
  const dailyGrowth = 2000; // Average daily growth
  const volatility = 0.3; // 30% volatility

  return Array.from({ length: days }, (_, i) => {
    const trend = baseFollowers + (dailyGrowth * i);
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    return Math.round(trend * randomFactor);
  });
};

const generateEngagementData = (days: number): number[] => {
  const baseEngagement = 150000; // 150K base daily engagement
  const volatility = 0.8; // 80% volatility for more dramatic changes

  return Array.from({ length: days }, () => {
    const randomFactor = 1 + (Math.random() - 0.5) * volatility;
    return Math.round(baseEngagement * randomFactor);
  });
};

const getDaysFromTimeRange = (timeRange: TimeRange): number => {
  switch (timeRange) {
    case '7D': return 7;
    case '28D': return 28;
    case '90D': return 90;
  }
};

export const generateMetricData = (metric: MetricType, timeRange: TimeRange): DataPoint[] => {
  const days = getDaysFromTimeRange(timeRange);
  const allValues = metric === 'followers' 
    ? generateFollowerData(90) // Generate 90 days of data
    : generateEngagementData(90);
  
  // Take the last X days based on the time range
  const values = allValues.slice(-days);

  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));

    // Add posts every 2-3 days
    const hasPosts = i % Math.floor(Math.random() * 2 + 2) === 0;

    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      value: values[i],
      posts: hasPosts ? samplePosts : undefined
    };
  });
};