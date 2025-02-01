import React from 'react';
import { PieChart } from 'lucide-react';

interface EngagementDistributionProps {
  distribution?: {
    likes: number;
    comments: number;
  };
  isLoading: boolean;
}

export const EngagementDistribution: React.FC<EngagementDistributionProps> = ({ 
  distribution,
  isLoading 
}) => {
  // Always render the component structure, but show loading state when needed
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        {isLoading ? (
          <div className="h-6 bg-white/10 rounded w-48 animate-pulse" />
        ) : (
          <h3 className="text-white font-semibold">Engagement Distribution</h3>
        )}
        <PieChart className={`w-5 h-5 ${isLoading ? 'text-white/10' : 'text-gray-400'}`} />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          // Loading skeleton
          [...Array(2)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-white/10 rounded w-24 animate-pulse" />
                <div className="h-4 bg-white/10 rounded w-16 animate-pulse" />
              </div>
              <div className="h-2 bg-white/10 rounded animate-pulse" />
            </div>
          ))
        ) : distribution ? (
          // Actual content
          (() => {
            const engagementData = [
              { label: 'Likes', value: distribution.likes, color: 'from-purple-500 to-pink-500' },
              { label: 'Comments', value: distribution.comments, color: 'from-blue-500 to-cyan-500' },
            ];

            return engagementData.map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{label}</span>
                  <span className="text-white">{value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${color}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ));
          })()
        ) : (
          // No data state
          <div className="text-gray-400 text-center py-2">
            No engagement data available
          </div>
        )}
      </div>
    </div>
  );
};
