import React from 'react';
import { Target } from 'lucide-react';
import { POST_GOALS } from './goals/types';
import { GoalCard } from './goals/GoalCard';
import { useSavedAnalytics } from '../../../../hooks/useSavedAnalytics';
import { PostType } from '../../../../types/postType';

interface SavedPostGoalsAnalysisProps {
  handle: string;
  postType: PostType | 'all';
}

export const SavedPostGoalsAnalysis: React.FC<SavedPostGoalsAnalysisProps> = ({ 
  handle,
  postType
}) => {
  const { isLoading } = useSavedAnalytics(handle);

  if (isLoading) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-48" />
          <div className="h-10 bg-white/10 rounded" />
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-white/10 rounded w-32" />
                <div className="h-2 bg-white/10 rounded w-48" />
                <div className="h-2 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Post Goals Analysis</h3>
        </div>
      </div>

      <div className="space-y-6">
        {POST_GOALS.map(goal => (
          <GoalCard 
            key={goal.name}
            goal={goal}
            selectedType={postType}
          />
        ))}
      </div>
    </div>
  );
};