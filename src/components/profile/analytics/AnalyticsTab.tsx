import React, { useEffect } from 'react';
import { MetricsOverview } from '../metrics/MetricsOverview';
import { FollowersChart } from '../charts/FollowersChart';
import { GrowthTable } from '../growth/GrowthTable';
import { EngagementDistribution } from '../insights/EngagementDistribution';
import { PostMixDistribution } from '../insights/PostMixDistribution';
import { useTimeRange } from '../context/TimeRangeContext';
import { useProfileAnalytics } from '../../../hooks/useProfileAnalytics';

interface AnalyticsTabProps {
  handle: string;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ handle }) => {
  const { timeRange } = useTimeRange();
  const { profileData, growthData, engagementData, isLoading, error } = useProfileAnalytics(handle);

  useEffect(() => {
    console.log('AnalyticsTab mounted with handle:', handle);
  }, [handle]);

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading analytics: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 h-32" />
          ))}
        </div>
      </div>
    );
  }

  console.log('Rendering analytics with data:', { profileData, growthData, engagementData });

  // Calculate changes if growthData is available
  const changes = growthData?.length > 1 ? {
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
            growthData={growthData || []}
          />
        </div>
        <div className="space-y-6">
          <EngagementDistribution 
            distribution={engagementData?.distribution}
          />
          <PostMixDistribution 
            postMix={engagementData?.postMix}
          />
        </div>
      </div>
    </>
  );
};
