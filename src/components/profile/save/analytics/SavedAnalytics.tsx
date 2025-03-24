import React from 'react';
import { SavedPostTypeAnalysis } from './SavedPostTypeAnalysis';
import { SavedEngagementDistribution } from './SavedEngagementDistribution';
import { PostAnalysis } from './PostAnalysis';
import { TopicAnalysis } from './topics/TopicAnalysis';
import { useSavedAnalytics } from '../../../../hooks/useSavedAnalytics';
import { PostType } from '../../../../types/postType';

interface SavedAnalyticsProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  postType: PostType | 'all';
}

export const SavedAnalytics: React.FC<SavedAnalyticsProps> = ({ 
  handle,
  startDate,
  endDate,
  postType
}) => {
  const { isLoading } = useSavedAnalytics(handle, startDate, endDate);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Loading states... */}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <SavedPostTypeAnalysis handle={handle} postType={postType} />
          </div>
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <SavedEngagementDistribution handle={handle} postType={postType} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <PostAnalysis handle={handle} postType={postType} />
          </div>
        </div>
      </div>

      {/* Topic Analysis */}
      <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
        <TopicAnalysis handle={handle} postType={postType} />
      </div>
    </div>
  );
};