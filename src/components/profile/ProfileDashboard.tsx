import React, { useMemo } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { ProfileHeader } from './header/ProfileHeader';
import { TabContent } from './tabs/TabContent';
import { TimeRangeProvider } from './context/TimeRangeContext';
import { useTimelineFilter } from '../../hooks/useTimelineFilter';
import { useProfileAnalytics } from '../../hooks/useProfileAnalytics';

export const ProfileDashboard: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'analytics';
  
  if (!handle) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          No profile handle provided
        </div>
      </div>
    );
  }

  const {
    timeRange,
    startDate,
    endDate,
    handleTimeRangeChange,
    handleDateRangeChange
  } = useTimelineFilter();

  // Fetch analytics data at the top level
  const analytics = useProfileAnalytics(handle);

  // Memoize the analytics data to prevent unnecessary re-renders
  const memoizedAnalytics = useMemo(() => analytics, [
    analytics.profileData,
    analytics.growthData,
    analytics.engagementData,
    analytics.isLoading,
    analytics.error
  ]);

  return (
    <TimeRangeProvider initialValue={timeRange} onChange={handleTimeRangeChange}>
      <div className="min-h-screen bg-black pt-24 px-4 pb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <ProfileHeader handle={handle} analytics={memoizedAnalytics} />
          <TabContent 
            activeTab={activeTab} 
            handle={handle}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateRangeChange}
            analytics={memoizedAnalytics}
          />
        </div>
      </div>
    </TimeRangeProvider>
  );
};
