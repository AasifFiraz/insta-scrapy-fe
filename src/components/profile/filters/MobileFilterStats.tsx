import React from 'react';
import { formatNumber } from '../../../utils/numberFormat';

interface MobileFilterStatsProps {
  totalPosts: number;
  totalEngagement: number;
  averageEngagement: number;
}

export const MobileFilterStats: React.FC<MobileFilterStatsProps> = ({
  totalPosts,
  totalEngagement,
  averageEngagement
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 py-2">
      <div className="text-center">
        <div className="text-xs text-gray-400">Posts</div>
        <div className="text-sm text-white font-medium">{formatNumber(totalPosts)}</div>
      </div>
      <div className="text-center border-l border-r border-white/10">
        <div className="text-xs text-gray-400">Total Engagement</div>
        <div className="text-sm text-white font-medium">{formatNumber(totalEngagement)}</div>
      </div>
      <div className="text-center">
        <div className="text-xs text-gray-400">Avg. Engagement</div>
        <div className="text-sm text-white font-medium">{formatNumber(averageEngagement)}</div>
      </div>
    </div>
  );
};