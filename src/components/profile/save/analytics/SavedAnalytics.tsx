import React from 'react';
import { SavedPostTypeAnalysis } from './SavedPostTypeAnalysis';
import { SavedEngagementDistribution } from './SavedEngagementDistribution';
import { PostAnalysis } from './PostAnalysis';
import { TopicAnalysis } from './topics/TopicAnalysis';
import { useSavedAnalytics } from '../../../../hooks/useSavedAnalytics';
import { PostType } from '../../../../types/postType';
import { useInsights } from '../../../../context/InsightsContext';

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
  // We don't need to check loading state here as it's already handled by the parent InsightsContent component
  // The SavedPostTypeAnalysis and SavedEngagementDistribution components handle their own loading states
  const { data } = useSavedAnalytics(handle, startDate, endDate);

  return (
    <div className="space-y-6">
      {/* Analytics Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <SavedPostTypeAnalysis />
          </div>
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <SavedEngagementDistribution />
          </div>
        </div>
        {/* Post Analysis - Commented out as requested
        <div className="space-y-6">
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <PostAnalysis handle={handle} postType={postType} />
          </div>
        </div>
        */}
      </div>

      {/* Topic Analysis - Commented out as requested
      <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
        <TopicAnalysis handle={handle} postType={postType} />
      </div>
      */}
    </div>
  );
};