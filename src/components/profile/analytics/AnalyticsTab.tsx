import React from 'react';
import { MetricsOverview } from '../metrics/MetricsOverview';
import { GrowthTable } from '../growth/GrowthTable';
import { UseProfileAnalyticsResult } from '../../../hooks/useProfileAnalytics';

interface AnalyticsTabProps {
  handle: string;
  analytics: UseProfileAnalyticsResult;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ handle, analytics }) => {
  const { profileData, growthData, isLoading, error } = analytics;


  if (error) {
    return (
      <div className="text-red-500 p-4">
          Error loading analytics: {error}
      </div>
    );
  }

  // Calculate changes if growthData is available
  const changes = growthData?.length > 0 ? {
    followerChange: growthData[growthData.length - 1].followerChange,
    followingChange: 0,
    postsChange: growthData[growthData.length - 1].newPosts
  } : {};

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsOverview
          followers={profileData?.followers || 0}
          following={profileData?.following || 0}
          posts={profileData?.posts || 0}
          isPrivate={profileData?.isPrivate || false}
          {...changes}
        />
      </div>
      <div className="mt-6">
        <GrowthTable
          handle={handle}
          growthData={growthData || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
