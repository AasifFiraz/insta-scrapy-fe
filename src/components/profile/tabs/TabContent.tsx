import React from 'react';
import { AnalyticsTab } from '../analytics/AnalyticsTab';
import { PostsTab } from '../posts/PostsTab';
import { InsightsTab } from '../insights/InsightsTab';
import { useTimeRange } from '../context/TimeRangeContext';
import { UseProfileAnalyticsResult } from '../../../hooks/useProfileAnalytics';

interface TabContentProps {
  activeTab: string;
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  analytics: UseProfileAnalyticsResult;
}

export const TabContent: React.FC<TabContentProps> = ({ 
  activeTab, 
  handle,
  startDate,
  endDate,
  onDateChange,
  analytics
}) => {
  const { timeRange } = useTimeRange();

  switch (activeTab) {
    case 'analytics':
      return <AnalyticsTab handle={handle} analytics={analytics} />;
    case 'posts':
      return (
        <PostsTab 
          handle={handle}
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
        />
      );
    case 'insights':
      return (
        <InsightsTab 
          handle={handle}
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
          analytics={analytics}
        />
      );
    default:
      return null;
  }
};
