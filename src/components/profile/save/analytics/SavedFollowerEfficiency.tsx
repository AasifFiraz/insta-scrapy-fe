import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useSavedAnalytics } from '../../../../hooks/useSavedAnalytics';
import { formatNumber } from '../../../../utils/numberFormat';

interface SavedFollowerEfficiencyProps {
  handle: string;
}

export const SavedFollowerEfficiency: React.FC<SavedFollowerEfficiencyProps> = ({ handle }) => {
  const { data, isLoading } = useSavedAnalytics(handle);

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

  const colors = {
    image: 'from-purple-500 to-pink-500',
    carousel: 'from-blue-500 to-cyan-500',
    reel: 'from-emerald-500 to-teal-500'
  };

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Follower Efficiency</h3>
        </div>
      </div>

      <div className="space-y-4">
        {data.postTypes.map(({ type, followers, efficiency }) => (
          <div key={type}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400 capitalize">{type}s</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  {formatNumber(followers)} new followers
                </span>
                <span className="text-white">
                  {(efficiency * 100).toFixed(1)}% efficiency
                </span>
              </div>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${colors[type as keyof typeof colors]}`}
                style={{ width: `${efficiency * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};