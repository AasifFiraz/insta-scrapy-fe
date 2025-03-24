import { InsightsMetrics } from '../types/insights';
import { differenceInDays } from 'date-fns';
import axiosInstance from '../utils/axios';

export interface InsightsResponse {
  filters: {
    days: number;
    type: string | null;
  };
  insights: {
    activity_ratio: {
      distribution: {
        comments: number;
        likes: number;
      };
      value: number;
    };
    caption_length: {
      percentage_change: number;
      value: number;
    };
    conversion_rate: {
      percentage_change: number;
      value: number;
    };
    engagement_distribution: {
      comments: number;
      likes: number;
    };
    followers_per_day: {
      percentage_change: number;
      value: number;
    };
    hashtags_per_post: {
      percentage_change: number;
      value: number;
    };
    new_comments: {
      percentage_change: number;
      value: number;
    };
    new_followers: {
      daily_data: Array<{
        date: string;
        value: number;
      }>;
      percentage_change: number;
      value: number;
    };
    new_likes: {
      percentage_change: number;
      value: number;
    };
    new_posts: {
      percentage_change: number;
      value: number;
    };
    post_length: {
      percentage_change: number;
      value: number;
    };
    post_mix: {
      carousels: number;
      images: number;
      reels: number;
    };
    posting_frequency: {
      percentage_change: number;
      value: number;
    };
    reading_level: {
      distribution: {
        average: number;
        bad: number;
        good: number;
      };
      value: string;
    };
  };
}

// Get insights data from the API
export const getInsights = async (
  handle: string,
  days: number = 7,
  type?: 'image' | 'reel' | 'carousel'
): Promise<InsightsResponse> => {
  try {
    const response = await axiosInstance.get<InsightsResponse>(`/profile/${handle}/insights`, {
      params: {
        days,
        type
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching insights:', error);
    throw error;
  }
};

// Map API insights response to the InsightsMetrics format
export const mapInsightsResponseToMetrics = (data: InsightsResponse): InsightsMetrics => {
  if (!data?.insights) {
    throw new Error('Invalid insights data: missing insights object');
  }

  const insights = data.insights;

  // Helper function to safely access nested properties with type checking
  const safeGet = <T>(obj: Record<string, unknown>, path: string[], defaultVal: T): T => {
    try {
      let current: unknown = obj;
      for (const key of path) {
        if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
          current = (current as Record<string, unknown>)[key];
        } else {
          throw new Error(`Invalid path: ${path.join('.')}`);
        }
      }
      return (current !== undefined && current !== null) ? current as T : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  return {
    followers: {
      total: safeGet<number>(insights, ['new_followers', 'value'], 0),
      daily: safeGet<number>(insights, ['followers_per_day', 'value'], 0),
      change: safeGet<number>(insights, ['new_followers', 'percentage_change'], 0),
      dailyChange: safeGet<number>(insights, ['followers_per_day', 'percentage_change'], 0)
    },
    posts: {
      total: safeGet<number>(insights, ['new_posts', 'value'], 0),
      daily: safeGet<number>(insights, ['posting_frequency', 'value'], 0),
      change: safeGet<number>(insights, ['new_posts', 'percentage_change'], 0),
      dailyChange: safeGet<number>(insights, ['posting_frequency', 'percentage_change'], 0)
    },
    engagement: {
      likes: safeGet<number>(insights, ['new_likes', 'value'], 0),
      comments: safeGet<number>(insights, ['new_comments', 'value'], 0),
      likesChange: safeGet<number>(insights, ['new_likes', 'percentage_change'], 0),
      commentsChange: safeGet<number>(insights, ['new_comments', 'percentage_change'], 0),
      likesPerPost: 0, // Need to calculate if needed
      commentsPerPost: 0, // Need to calculate if needed
      likesPerPostChange: 0, // Not provided
      commentsPerPostChange: 0, // Not provided
      rate: safeGet<number>(insights, ['conversion_rate', 'value'], 0) / 100, // Convert to decimal
      rateChange: safeGet<number>(insights, ['conversion_rate', 'percentage_change'], 0)
    },
    content: {
      avgPostLength: safeGet<number>(insights, ['post_length', 'value'], 0),
      avgCaptionLength: safeGet<number>(insights, ['caption_length', 'value'], 0),
      avgHashtagCount: safeGet<number>(insights, ['hashtags_per_post', 'value'], 0),
      postLengthChange: safeGet<number>(insights, ['post_length', 'percentage_change'], 0),
      captionLengthChange: safeGet<number>(insights, ['caption_length', 'percentage_change'], 0),
      hashtagCountChange: safeGet<number>(insights, ['hashtags_per_post', 'percentage_change'], 0),
      newCTAs: 0, // Not provided in the API response
      ctaChange: 0, // Not provided in the API response
      readingLevel: safeGet<string>(insights, ['reading_level', 'value'], '0'),
      readingLevelChange: 0 // Not provided in the API response
    }
  };
};

// Fetch insights metrics using the new API endpoint
export const fetchInsightsMetrics = async (
  handle: string,
  startDate?: Date | null,
  endDate?: Date | null
): Promise<InsightsMetrics> => {
  try {
    // Calculate days from endDate to startDate, default to 7 if not provided
    const days = startDate && endDate 
      ? Math.min(differenceInDays(endDate, startDate), 30) // Cap at 30 days
      : 7;
    
    const insightsData = await getInsights(handle, days);
    return mapInsightsResponseToMetrics(insightsData);
  } catch (error) {
    console.error('Error fetching insights metrics:', error);
    throw error; // Throw the error instead of falling back to mock data
  }
};
