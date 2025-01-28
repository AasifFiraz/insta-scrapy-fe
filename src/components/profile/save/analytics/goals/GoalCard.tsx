import React from 'react';
import { PostType } from './PostTypeFilter';
import { PostGoal } from './types';

interface GoalCardProps {
  goal: PostGoal;
  selectedType: PostType;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, selectedType }) => {
  const getValue = () => {
    if (selectedType === 'all') {
      // Calculate weighted average across all types
      const total = goal.metrics.image + goal.metrics.carousel + goal.metrics.reel;
      return Math.round(total / 3);
    }
    return goal.metrics[selectedType === 'all' ? 'image' : selectedType];
  };

  const value = getValue();

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <h4 className="text-white font-medium">{goal.name}</h4>
          <p className="text-gray-400 text-sm">{goal.description}</p>
        </div>
        <span className="text-white font-medium">{value}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div 
          className={`h-full ${
            selectedType === 'all'
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500'
              : selectedType === 'image' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : selectedType === 'carousel'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500'
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};