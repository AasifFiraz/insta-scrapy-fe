import React from 'react';
import { formatNumber } from '../../../../../utils/numberFormat';

interface SavedMetricsOverviewProps {
  totalFollowers: number;
  followerGrowth: number;
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  avgLikesPerPost: number;
  avgCommentsPerPost: number;
  postToFollowerRatio: number;
  engagementToFollowerRatio: number;
}

export const SavedMetricsOverview: React.FC<SavedMetricsOverviewProps> = () => {
  // All metrics have been moved to InsightsMetricsGrid
  return null;
};