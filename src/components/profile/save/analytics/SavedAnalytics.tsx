import React from 'react';
// Commented out as these components are no longer used
// import { SavedPostTypeAnalysis } from './SavedPostTypeAnalysis';
// import { SavedEngagementDistribution } from './SavedEngagementDistribution';
// import { PostAnalysis } from './PostAnalysis';
// import { TopicAnalysis } from './topics/TopicAnalysis';
import { useSavedAnalytics } from '../../../../hooks/useSavedAnalytics';
import { PostType } from '../../../../types/postType';
// import { useInsights } from '../../../../context/InsightsContext';

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
  // Commented out as it's no longer used
  // postType
}) => {
  // We don't need to check loading state here as it's already handled by the parent InsightsContent component
  // The SavedPostTypeAnalysis and SavedEngagementDistribution components handle their own loading states
  // Commented out as it's no longer used
  // const { data } = useSavedAnalytics(handle, startDate, endDate);
  useSavedAnalytics(handle, startDate, endDate); // Just call the hook without using the return value

  return (
    <div className="space-y-6">
      {/* Analytics Components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Post Mix - Commented out as requested
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <SavedPostTypeAnalysis />
          </div>
          */}
          {/* Engagement Distribution - Commented out as requested
          <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
            <SavedEngagementDistribution />
          </div>
          */}
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