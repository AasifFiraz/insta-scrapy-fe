import React from 'react';
import { PieChart } from 'lucide-react';
import { PostType } from '../../../../types/postType';
import { usePostMixData } from '../../../../hooks/usePostMixData';

interface SavedPostTypeAnalysisProps {
  handle: string;
  postType: PostType | 'all';
}

export const SavedPostTypeAnalysis: React.FC<SavedPostTypeAnalysisProps> = ({
  handle,
  postType
}) => {
  const { postMixData, isLoading, error } = usePostMixData(handle, 7, postType === 'all' ? undefined : postType);

  if (isLoading) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-48" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-white/10 rounded w-24" />
                  <div className="h-4 bg-white/10 rounded w-16" />
                </div>
                <div className="h-2 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !postMixData) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="text-red-500">Failed to load post mix data</div>
      </div>
    );
  }

  const colors = {
    image: 'from-purple-500 to-pink-500',
    carousel: 'from-blue-500 to-cyan-500',
    reel: 'from-emerald-500 to-teal-500'
  };

  // Calculate total posts
  const totalPosts = postMixData.carousels.count + postMixData.images.count + postMixData.reels.count;

  // Prepare data for rendering
  const postTypes = [
    {
      type: 'carousel',
      count: postMixData.carousels.count,
      percentageChange: postMixData.carousels.percentage_change
    },
    {
      type: 'image',
      count: postMixData.images.count,
      percentageChange: postMixData.images.percentage_change
    },
    {
      type: 'reel',
      count: postMixData.reels.count,
      percentageChange: postMixData.reels.percentage_change
    }
  ];

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Post Mix</h3>
        </div>
      </div>

      <div className="space-y-4">
        {postTypes.map(({ type, count, percentageChange }) => (
          <div key={type}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400 capitalize">{type}s</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">{count} posts</span>
                <div className="flex items-baseline gap-2">
                  <span className={`text-sm ${
                    percentageChange >= 0 ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${colors[type as keyof typeof colors]}`}
                style={{ width: `${totalPosts > 0 ? (count / totalPosts) * 100 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};