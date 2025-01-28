import React from 'react';
import { 
  Users, UserPlus, FileText, TrendingUp, 
  Heart, MessageCircle, Activity, Share2, 
  Target, FileEdit, AlignLeft, Hash,
  MousePointer, BookOpen
} from 'lucide-react';
import { InsightMetricCard } from './InsightMetricCard';
import { InsightsMetrics } from './types';

interface InsightsMetricsGridProps {
  metrics: InsightsMetrics;
}

export const InsightsMetricsGrid: React.FC<InsightsMetricsGridProps> = ({ metrics }) => {
  // Calculate activity ratio (% of active engaged followers)
  const activityRatio = ((metrics.engagement.likes + metrics.engagement.comments) / metrics.followers.total) * 100;
  const activityRatioChange = metrics.engagement.rateChange;

  // Calculate post-to-follower ratio
  const postToFollowerRatio = (metrics.posts.total / metrics.followers.total) * 100;
  const postToFollowerChange = metrics.posts.change - metrics.followers.change;

  const cards = [
    // Growth Metrics
    {
      title: 'New Followers',
      value: metrics.followers.total,
      change: `${metrics.followers.change}%`,
      changeType: metrics.followers.change >= 0 ? 'increase' : 'decrease',
      icon: Users,
      tooltip: 'New followers gained in this period'
    },
    {
      title: 'Followers Per Day',
      value: Math.round(metrics.followers.daily),
      change: `${metrics.followers.dailyChange}%`,
      changeType: metrics.followers.dailyChange >= 0 ? 'increase' : 'decrease',
      icon: UserPlus,
      tooltip: 'Average daily follower growth'
    },
    {
      title: 'New Posts',
      value: metrics.posts.total,
      change: `${metrics.posts.change}%`,
      changeType: metrics.posts.change >= 0 ? 'increase' : 'decrease',
      icon: FileText,
      tooltip: 'New posts published in this period'
    },
    {
      title: 'Posting Frequency',
      value: metrics.posts.daily.toFixed(1),
      change: `${metrics.posts.dailyChange}%`,
      changeType: metrics.posts.dailyChange >= 0 ? 'increase' : 'decrease',
      icon: TrendingUp,
      tooltip: 'Posts per day and change from previous period'
    },

    // Engagement Metrics
    {
      title: 'New Likes',
      value: metrics.engagement.likes,
      change: `${metrics.engagement.likesChange}%`,
      changeType: metrics.engagement.likesChange >= 0 ? 'increase' : 'decrease',
      icon: Heart,
      tooltip: 'New likes received in this period'
    },
    {
      title: 'New Comments',
      value: metrics.engagement.comments,
      change: `${metrics.engagement.commentsChange}%`,
      changeType: metrics.engagement.commentsChange >= 0 ? 'increase' : 'decrease',
      icon: MessageCircle,
      tooltip: 'New comments received in this period'
    },
    {
      title: 'Activity Ratio',
      value: `${activityRatio.toFixed(1)}%`,
      change: `${activityRatioChange}%`,
      changeType: activityRatioChange >= 0 ? 'increase' : 'decrease',
      icon: Activity,
      tooltip: 'Percentage of followers actively engaging with content'
    },
    {
      title: 'Conversion Rate',
      value: `${postToFollowerRatio.toFixed(2)}%`,
      change: `${postToFollowerChange.toFixed(1)}%`,
      changeType: postToFollowerChange >= 0 ? 'increase' : 'decrease',
      icon: Share2,
      tooltip: 'Ratio of posts to total followers'
    },
    {
      title: 'Engagement Rate',
      value: `${(metrics.engagement.rate * 100).toFixed(1)}%`,
      change: `${metrics.engagement.rateChange}%`,
      changeType: metrics.engagement.rateChange >= 0 ? 'increase' : 'decrease',
      icon: Target,
      tooltip: 'Overall engagement rate and change from previous period'
    },

    // Content Metrics
    {
      title: 'Post Length',
      value: metrics.content.avgPostLength,
      change: `${metrics.content.postLengthChange}%`,
      changeType: metrics.content.postLengthChange >= 0 ? 'increase' : 'decrease',
      icon: FileEdit,
      tooltip: 'Average length of posts in characters'
    },
    {
      title: 'Caption Length',
      value: metrics.content.avgCaptionLength,
      change: `${metrics.content.captionLengthChange}%`,
      changeType: metrics.content.captionLengthChange >= 0 ? 'increase' : 'decrease',
      icon: AlignLeft,
      tooltip: 'Average length of captions in characters'
    },
    {
      title: 'Hashtags per Post',
      value: metrics.content.avgHashtagCount.toFixed(1),
      change: `${metrics.content.hashtagCountChange}%`,
      changeType: metrics.content.hashtagCountChange >= 0 ? 'increase' : 'decrease',
      icon: Hash,
      tooltip: 'Average hashtags per post and change from previous period'
    },
    {
      title: 'New CTAs',
      value: metrics.content.newCTAs,
      change: `${metrics.content.ctaChange}%`,
      changeType: metrics.content.ctaChange >= 0 ? 'increase' : 'decrease',
      icon: MousePointer,
      tooltip: 'New call-to-actions added in this period'
    },
    {
      title: 'Reading Level',
      value: metrics.content.readingLevel.toFixed(1),
      change: `${metrics.content.readingLevelChange}%`,
      changeType: metrics.content.readingLevelChange >= 0 ? 'increase' : 'decrease',
      icon: BookOpen,
      tooltip: 'Average reading level of content (Flesch-Kincaid)'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <InsightMetricCard key={index} {...card} />
      ))}
    </div>
  );
};