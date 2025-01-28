import { InsightsMetrics } from '../types/insights';
import { isWithinInterval } from 'date-fns';

// Mock data service - will be replaced with actual API calls
export const fetchInsightsMetrics = async (
  handle: string,
  startDate?: Date | null,
  endDate?: Date | null
): Promise<InsightsMetrics> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Base metrics
  const baseMetrics = {
    followers: {
      total: 2500000,
      daily: 834,
      change: 15.2,
      dailyChange: 12.5
    },
    posts: {
      total: 450,
      daily: 1.5,
      change: 8.3,
      dailyChange: 5.2
    },
    engagement: {
      likes: 150000,
      comments: 8500,
      likesChange: 12.4,
      commentsChange: 9.8,
      likesPerPost: 3334,
      commentsPerPost: 189,
      likesPerPostChange: 7.2,
      commentsPerPostChange: 4.5,
      rate: 0.064,
      rateChange: 2.1
    },
    content: {
      avgPostLength: 450,
      avgCaptionLength: 220,
      avgHashtagCount: 6.5,
      postLengthChange: 5.8,
      captionLengthChange: 3.2,
      hashtagCountChange: -2.4,
      newCTAs: 24,
      ctaChange: 8.5,
      readingLevel: 8.2,
      readingLevelChange: 1.2
    }
  };

  // If date range is provided, adjust metrics based on the range
  if (startDate && endDate) {
    const today = new Date();
    const daysInRange = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.round((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Adjust metrics based on the date range
    const rangeMultiplier = daysInRange / 90; // Assuming base metrics are for 90 days
    
    return {
      followers: {
        ...baseMetrics.followers,
        total: Math.round(baseMetrics.followers.total * (1 - (totalDays / 365))), // Adjust total based on date
        daily: Math.round(baseMetrics.followers.daily * rangeMultiplier)
      },
      posts: {
        ...baseMetrics.posts,
        total: Math.round(baseMetrics.posts.total * rangeMultiplier),
        daily: baseMetrics.posts.daily
      },
      engagement: {
        ...baseMetrics.engagement,
        likes: Math.round(baseMetrics.engagement.likes * rangeMultiplier),
        comments: Math.round(baseMetrics.engagement.comments * rangeMultiplier)
      },
      content: baseMetrics.content // Content metrics remain the same
    };
  }

  return baseMetrics;
};