import { MetricType, TimeRange, DataPoint } from '../../types/metrics';
import { METRICS_PATTERNS } from './constants';
import { samplePosts } from '../samplePosts';

// Cache for consistent data across time ranges
let cachedData: {
  followers: number[];
  engagement: number[];
  lastGenerated: number;
} | null = null;

const generateFullTimeline = () => {
  const days = 90; // Always generate 90 days of data
  const { FOLLOWERS, ENGAGEMENT } = METRICS_PATTERNS;
  
  let followers = FOLLOWERS.BASE;
  const followerTimeline: number[] = [followers];
  const engagementTimeline: number[] = [];

  for (let i = 1; i < days; i++) {
    // Generate follower growth with smoother progression
    const progress = i / days; // 0 to 1
    const baseGrowth = FOLLOWERS.DAILY_GROWTH.MIN + 
      (FOLLOWERS.DAILY_GROWTH.MAX - FOLLOWERS.DAILY_GROWTH.MIN) * progress;
    
    // Add weekly pattern
    const dayOfWeek = i % 7;
    const weeklyFactor = ENGAGEMENT.WEEKLY_PATTERN[dayOfWeek];
    const growth = baseGrowth * weeklyFactor;
    
    // Add controlled randomness
    const variation = 1 + (Math.sin(i * 0.3) * 0.5 + Math.random() * 0.5) * FOLLOWERS.VOLATILITY;
    followers += Math.round(growth * variation);
    followerTimeline.push(followers);

    // Generate engagement based on current followers with weekly patterns
    const baseEngagement = followers * ENGAGEMENT.BASE_RATE;
    const randomVariation = 1 + (Math.sin(i * 0.5) * 0.5 + Math.random() * 0.5) * ENGAGEMENT.DAILY_VARIATION;
    engagementTimeline.push(Math.round(baseEngagement * weeklyFactor * randomVariation));
  }

  return {
    followers: followerTimeline,
    engagement: engagementTimeline,
    lastGenerated: Date.now()
  };
};

export const getOrGenerateMetricsData = () => {
  const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

  if (!cachedData || Date.now() - cachedData.lastGenerated > CACHE_DURATION) {
    cachedData = generateFullTimeline();
  }

  return cachedData;
};

const getDaysFromTimeRange = (timeRange: TimeRange): number => {
  switch (timeRange) {
    case '7D': return 7;
    case '28D': return 28;
    case '90D': return 90;
  }
};

export const generateMetricData = (metric: MetricType, timeRange: TimeRange): DataPoint[] => {
  const data = getOrGenerateMetricsData();
  const days = getDaysFromTimeRange(timeRange);
  const values = metric === 'followers' 
    ? data.followers.slice(-days)
    : data.engagement.slice(-days);

  return values.map((value, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    // Add posts more frequently for followers chart
    const hasPosts = metric === 'followers' && (
      i % 2 === 0 || // Every other day
      (i > 0 && value > values[i - 1] * 1.01) // On significant growth days
    );

    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      value,
      posts: hasPosts ? samplePosts : undefined
    };
  });
};