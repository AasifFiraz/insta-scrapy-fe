import React from 'react';
import { Zap } from 'lucide-react';
import { PostType } from '../../../../types/postType';
import { useEngagementDistribution } from '../../../../hooks/useEngagementDistribution';

interface SavedEngagementDistributionProps {
  handle: string;
  postType: PostType | 'all';
}

export const SavedEngagementDistribution: React.FC<SavedEngagementDistributionProps> = ({
  handle,
  postType
}) => {
  const { distributionData, isLoading, error } = useEngagementDistribution(
    handle,
    7,
    postType === 'all' ? undefined : postType
  );

  // Get gradient based on post type
  const getGradient = () => {
    switch (postType) {
      case 'all':
        return 'from-purple-500 via-pink-500 to-emerald-500';
      case 'image':
        return 'from-purple-500 to-pink-500';
      case 'carousel':
        return 'from-blue-500 to-cyan-500';
      case 'reel':
        return 'from-emerald-500 to-teal-500';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-48" />
          <div className="h-10 bg-white/10 rounded" />
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-white/10 rounded w-32" />
                <div className="h-2 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !distributionData) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="text-red-500">Failed to load engagement distribution data</div>
      </div>
    );
  }

  // Prepare data for rendering
  const formattedDistributionData = [
    { type: 'Likes', value: distributionData.likes },
    { type: 'Comments', value: distributionData.comments }
  ];

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Engagement Distribution</h3>
        </div>
      </div>

      <div className="space-y-4">
        {formattedDistributionData.map(({ type, value }) => (
          <div key={type}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">{type}</span>
              <span className="text-white">{value}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getGradient()}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};