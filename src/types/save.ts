export type SaveMode = 'analytics' | 'posts';

export interface SavedPostTypeMetrics {
  type: string;
  count: number;
  engagement: number;
  followers: number;
  efficiency: number;
}

export interface SavedPostAngle {
  type: string;
  count: number;
  engagement: number;
  examples: string[];
}

export interface GrowthDataPoint {
  date: string;
  followers: number;
  engagement: number;
}

export interface SavedAnalyticsData {
  totalFollowers: number;
  followerGrowth: number;
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  averageEngagement: number;
  postTypes: SavedPostTypeMetrics[];
  postAngles: SavedPostAngle[];
  growthData: GrowthDataPoint[];
}