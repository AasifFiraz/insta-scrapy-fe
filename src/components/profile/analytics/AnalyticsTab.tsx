import React, { useEffect } from 'react';
import { MetricsOverview } from '../metrics/MetricsOverview';
import { FollowersChart } from '../charts/FollowersChart';
import { GrowthTable } from '../growth/GrowthTable';
import { EngagementDistribution } from '../insights/EngagementDistribution';
import { PostMixDistribution } from '../insights/PostMixDistribution';
import { useTimeRange } from '../context/TimeRangeContext';
import { UseProfileAnalyticsResult } from '../../../hooks/useProfileAnalytics';

interface AnalyticsTabProps {
  handle: string;
  analytics: UseProfileAnalyticsResult;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ handle, analytics }) => {
  const { timeRange } = useTimeRange();
  const { profileData, growthData, engagementData, isLoading, error } = analytics;


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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <GrowthTable 
            handle={handle} 
            growthData={growthData}
          />
        </div>
        <div className="space-y-6">
          {/* Always render components but pass isLoading state */}
          <EngagementDistribution 
            distribution={engagementData?.engagement?.distribution}
            isLoading={isLoading || !engagementData}
          />
          <PostMixDistribution 
            postMix={engagementData?.engagement?.postMix}
            isLoading={isLoading || !engagementData}
          />
        </div>
      </div>
    </>
  );
};
