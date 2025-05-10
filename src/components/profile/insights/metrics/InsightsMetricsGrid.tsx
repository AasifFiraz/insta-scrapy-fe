import React from 'react';
import { 
  Users, UserPlus, FileText, TrendingUp, 
  Heart, MessageCircle, AlignLeft, Hash
} from 'lucide-react';
import { InsightMetricCard } from './InsightMetricCard';
import { InsightsMetrics } from './types';

interface InsightsMetricsGridProps {
  metrics: InsightsMetrics;
}

export const InsightsMetricsGrid: React.FC<InsightsMetricsGridProps> = ({ metrics }) => {
  // We've removed some metrics calculations as they're no longer needed

  const cards = [
    // Growth Metrics
    {
      title: 'New Followers',
      value: metrics.followers.total,
      change: `${metrics.followers.change}%`,
      changeType: metrics.followers.change >= 0 ? 'increase' as const : 'decrease' as const,
      icon: Users,
      tooltip: 'New followers gained in this period'
    },
    {
      title: 'Followers Per Day',
      value: Math.round(metrics.followers.daily),
      change: `${metrics.followers.dailyChange}%`,
      changeType: metrics.followers.dailyChange >= 0 ? 'increase' as const : 'decrease' as const,
      icon: UserPlus,
      tooltip: 'Average daily follower growth'
    },
    {
      title: 'New Posts',
      value: metrics.posts.total,
      change: `${metrics.posts.change}%`,
      changeType: metrics.posts.change >= 0 ? 'increase' as const : 'decrease' as const,
      icon: FileText,
      tooltip: 'New posts published in this period'
    },
    {
      title: 'Posting Frequency',
      value: metrics.posts.daily.toFixed(1),
      change: `${metrics.posts.dailyChange}%`,
      changeType: metrics.posts.dailyChange >= 0 ? 'increase' as const : 'decrease' as const,
      icon: TrendingUp,
      tooltip: 'Posts per day and change from previous period'
    },

    // Engagement Metrics
    {
      title: 'New Likes',
      value: metrics.engagement.likes,
      change: `${metrics.engagement.likesChange}%`,
      changeType: metrics.engagement.likesChange >= 0 ? 'increase' as const : 'decrease' as const,
      icon: Heart,
      tooltip: 'New likes received in this period'
    },
    {
      title: 'New Comments',
      value: metrics.engagement.comments,
      change: `${metrics.engagement.commentsChange}%`,
      changeType: metrics.engagement.commentsChange >= 0 ? 'increase' as const : 'decrease' as const,
      icon: MessageCircle,
      tooltip: 'New comments received in this period'
    },
    // Activity Ratio, Conversion Rate, and Engagement Rate have been removed

    // Content Metrics
    // Post Length has been removed
    {
      title: 'Caption Length',
      value: metrics.content.avgCaptionLength,
      change: `${metrics.content.captionLengthChange}%`,
      changeType: metrics.content.captionLengthChange >= 0 ? 'increase' as const : 'decrease' as const,
      icon: AlignLeft,
      tooltip: 'Average length of captions in characters'
    },
    {
      title: 'Hashtags per Post',
      value: metrics.content.avgHashtagCount.toFixed(1),
      change: `${metrics.content.hashtagCountChange}%`,
      changeType: metrics.content.hashtagCountChange >= 0 ? 'increase' as const : 'decrease' as const,
      icon: Hash,
      tooltip: 'Average hashtags per post and change from previous period'
    },
    // Removed Reading Level metric as it's not in the metrics type
  ];

  // Adjust the grid layout based on the number of remaining cards (8 cards):
  // - 1 column on mobile (unchanged)
  // - 2 columns on small screens (unchanged)
  // - 3 columns on large screens (changed from 4 to ensure better spacing with 8 cards)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <InsightMetricCard key={index} {...card} />
      ))}
    </div>
  );
};