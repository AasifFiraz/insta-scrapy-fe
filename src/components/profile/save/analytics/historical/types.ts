export type HistoricalMetric = 
  | 'newFollowers'
  | 'followersPerDay'
  | 'newPosts'
  | 'postingFrequency'
  | 'newLikes'
  | 'newComments'
  | 'activityRatio'
  | 'followerRatio'
  | 'engagementRate'
  | 'newCTAs'
  | 'readingLevel'
  | 'hashtagsPerPost';

export interface MetricOption {
  value: HistoricalMetric;
  label: string;
  description: string;
  category: 'growth' | 'engagement' | 'content';
}

export const METRIC_OPTIONS: MetricOption[] = [
  // Growth Metrics
  {
    value: 'newFollowers',
    label: 'New Followers',
    description: 'New followers gained over time',
    category: 'growth'
  },
  {
    value: 'followersPerDay',
    label: 'Followers Per Day',
    description: 'Average daily follower growth',
    category: 'growth'
  },
  {
    value: 'newPosts',
    label: 'New Posts',
    description: 'New posts published over time',
    category: 'growth'
  },
  {
    value: 'postingFrequency',
    label: 'Posting Frequency',
    description: 'Posts per day over time',
    category: 'growth'
  },
  // Engagement Metrics
  {
    value: 'newLikes',
    label: 'New Likes',
    description: 'New likes received over time',
    category: 'engagement'
  },
  {
    value: 'newComments',
    label: 'New Comments',
    description: 'New comments received over time',
    category: 'engagement'
  },
  {
    value: 'activityRatio',
    label: 'Activity Ratio',
    description: 'Percentage of followers actively engaging',
    category: 'engagement'
  },
  {
    value: 'followerRatio',
    label: 'Follower Ratio',
    description: 'Ratio of posts to total followers',
    category: 'engagement'
  },
  {
    value: 'engagementRate',
    label: 'Engagement Rate',
    description: 'Overall engagement rate over time',
    category: 'engagement'
  },
  // Content Metrics
  {
    value: 'newCTAs',
    label: 'New CTAs',
    description: 'Call-to-actions in posts over time',
    category: 'content'
  },
  {
    value: 'readingLevel',
    label: 'Reading Level',
    description: 'Average reading level of content',
    category: 'content'
  },
  {
    value: 'hashtagsPerPost',
    label: 'Hashtags per Post',
    description: 'Average hashtags per post over time',
    category: 'content'
  }
];