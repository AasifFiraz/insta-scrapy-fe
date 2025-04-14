import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AnalyticsTab } from '../analytics/AnalyticsTab';
import { PostsTab } from '../posts/PostsTab';
import { UseProfileAnalyticsResult } from '../../../hooks/useProfileAnalytics';
import { useAuth } from '../../../hooks/useAuth';
import { FiltersBar } from '../filters/FiltersBar';
import { PostType } from '../../../types/postType';

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
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');

  // If user is not authenticated and tries to access protected tabs,
  // redirect to analytics tab
  if (!isAuthenticated && activeTab === 'posts') {
    return <Navigate to={`/profile/${handle}?tab=analytics`} replace />;
  }

  return (
    <div className="space-y-6">
      {/* Tab Content */}
      {(() => {
        switch (activeTab) {
          case 'analytics':
            return <AnalyticsTab handle={handle} analytics={analytics} />;
          case 'posts':
            return (
              <>
                {/* Filters - Only shown for Posts tab */}
                <FiltersBar
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={onDateChange}
                />

                {/* Posts Tab Content */}
                <PostsTab
                  handle={handle}
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={onDateChange}
                  selectedType={selectedType}
                  onTypeChange={setSelectedType}
                />
              </>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};
