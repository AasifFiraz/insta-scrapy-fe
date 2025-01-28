import React, { useState } from 'react';
import { BarChart2, Target, Lightbulb } from 'lucide-react';
import { POST_GOALS } from './goals/types';
import { POST_ANGLES } from './angles/types';
import { GoalCard } from './goals/GoalCard';
import { AngleCard } from './angles/AngleCard';
import { useSavedAnalytics } from '../../../../hooks/useSavedAnalytics';
import { PostType } from '../../../../types/postType';

type AnalysisType = 'goals' | 'angles';

interface PostAnalysisProps {
  handle: string;
  postType: PostType | 'all';
}

export const PostAnalysis: React.FC<PostAnalysisProps> = ({ 
  handle,
  postType
}) => {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('goals');
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
          <BarChart2 className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Post Analysis</h3>
        </div>

        {/* Analysis Type Selector */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setAnalysisType('goals')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              analysisType === 'goals'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Goals</span>
          </button>
          <button
            onClick={() => setAnalysisType('angles')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
              analysisType === 'angles'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Angles</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {analysisType === 'goals' ? (
          POST_GOALS.map(goal => (
            <GoalCard 
              key={goal.name}
              goal={goal}
              selectedType={postType}
            />
          ))
        ) : (
          POST_ANGLES.map(angle => (
            <AngleCard 
              key={angle.name}
              angle={angle}
              selectedType={postType}
            />
          ))
        )}
      </div>
    </div>
  );
};