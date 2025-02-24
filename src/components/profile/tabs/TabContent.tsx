import React from 'react';
import { Navigate } from 'react-router-dom';
import { AnalyticsTab } from '../analytics/AnalyticsTab';
import { PostsTab } from '../posts/PostsTab';
import { InsightsTab } from '../insights/InsightsTab';
import { UseProfileAnalyticsResult } from '../../../hooks/useProfileAnalytics';
import { useAuth } from '../../../hooks/useAuth';

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
  const { isAuthenticated } = useAuth();

  // If user is not authenticated and tries to access protected tabs,
  // redirect to analytics tab
  if (!isAuthenticated && (activeTab === 'posts' || activeTab === 'insights')) {
    return <Navigate to={`/profile/${handle}?tab=analytics`} replace />;
  }

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
