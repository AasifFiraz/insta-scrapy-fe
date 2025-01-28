export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ComponentType;
  tooltip?: string;
}

export interface InsightsMetrics {
  followers: {
    total: number;
    daily: number;
    change: number;
    dailyChange: number;
  };
  posts: {
    total: number;
    daily: number;
    change: number;
    dailyChange: number;
  };
  engagement: {
    likes: number;
    comments: number;
    likesChange: number;
    commentsChange: number;
    likesPerPost: number;
    commentsPerPost: number;
    likesPerPostChange: number;
    commentsPerPostChange: number;
    rate: number;
    rateChange: number;
  };
  content: {
    avgPostLength: number;
    avgCaptionLength: number;
    avgHashtagCount: number;
    postLengthChange: number;
    captionLengthChange: number;
    hashtagCountChange: number;
  };
}