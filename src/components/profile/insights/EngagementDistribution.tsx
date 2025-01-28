import React from 'react';
import { PieChart } from 'lucide-react';

interface EngagementDistributionProps {
  distribution?: {
    likes: number;
    comments: number;
  };
}

export const EngagementDistribution: React.FC<EngagementDistributionProps> = ({ distribution }) => {
  if (!distribution) {
    return null;
  }

  const engagementData = [
    { label: 'Likes', value: distribution.likes, color: 'from-purple-500 to-pink-500' },
    { label: 'Comments', value: distribution.comments, color: 'from-blue-500 to-cyan-500' },
  ];

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Engagement Distribution</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {engagementData.map(({ label, value, color }) => (
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
        ))}
      </div>
    </div>
  );
};
