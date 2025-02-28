import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProfileHeader } from './header/ProfileHeader';
import { TabContent } from './tabs/TabContent';
import { TimeRangeProvider } from './context/TimeRangeContext';
import { useTimelineFilter } from '../../hooks/useTimelineFilter';
import { useProfileAnalytics } from '../../hooks/useProfileAnalytics';

// Create a separate component for the content that needs TimeRange context
const ProfileContent: React.FC<{ 
  handle: string;
  activeTab: string;
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}> = ({ handle, activeTab, startDate, endDate, onDateChange }) => {
  const analytics = useProfileAnalytics(handle);
  const memoizedAnalytics = useMemo(() => analytics, [analytics]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ProfileHeader handle={handle} analytics={memoizedAnalytics} />
      <TabContent 
        activeTab={activeTab} 
        handle={handle}
        startDate={startDate}
        endDate={endDate}
        onDateChange={onDateChange}
        analytics={memoizedAnalytics}
      />
    </div>
  );
};

export const ProfileDashboard: React.FC = () => {
  const { handle } = useParams<{ handle: string }>();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'analytics';
  
  const {
    timeRange,
    startDate,
    endDate,
    handleTimeRangeChange,
    handleDateRangeChange
  } = useTimelineFilter('7D');

  if (!handle) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          No profile handle provided
        </div>
      </div>
    );
  }

  return (
    <TimeRangeProvider initialValue={timeRange} onChange={handleTimeRangeChange}>
      <div className="min-h-screen bg-black pt-24 px-4 pb-8 overflow-hidden">
        <ProfileContent
          handle={handle}
          activeTab={activeTab}
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateRangeChange}
        />
      </div>
    </TimeRangeProvider>
  );
};
