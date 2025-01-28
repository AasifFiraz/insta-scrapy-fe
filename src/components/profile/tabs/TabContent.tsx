import React from 'react';
import { AnalyticsTab } from '../analytics/AnalyticsTab';
import { PostsTab } from '../posts/PostsTab';
import { InsightsTab } from '../insights/InsightsTab';
import { useTimeRange } from '../context/TimeRangeContext';

interface TabContentProps {
  activeTab: string;
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
}

export const TabContent: React.FC<TabContentProps> = ({ 
  activeTab, 
  handle,
  startDate,
  endDate,
  onDateChange
}) => {
  const { timeRange } = useTimeRange();

  switch (activeTab) {
    case 'analytics':
      return <AnalyticsTab handle={handle} />;
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
        />
      );
    default:
      return null;
  }
};