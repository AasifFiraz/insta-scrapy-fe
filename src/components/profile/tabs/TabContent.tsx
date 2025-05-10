import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AnalyticsTab } from '../analytics/AnalyticsTab';
import { PostsTab } from '../posts/PostsTab';
import { UseProfileAnalyticsResult } from '../../../hooks/useProfileAnalytics';
import { useAuth } from '../../../hooks/useAuth';
import { PostType } from '../../../types/postType';

interface TabContentProps {
  activeTab: string;
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  analytics: UseProfileAnalyticsResult;
  onApiLoadingChange?: (isLoading: boolean) => void;
  selectedType?: PostType | 'all';
  onTypeChange?: (type: PostType | 'all') => void;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  handle,
  startDate,
  endDate,
  onDateChange,
  analytics,
  onApiLoadingChange,
  selectedType = 'all',
  onTypeChange
}) => {
  const { isAuthenticated } = useAuth();
  const [isApiLoading, setIsApiLoading] = useState<boolean>(false);
  
  // Log when selectedType changes
  useEffect(() => {
    console.log(`TabContent: selectedType changed to ${selectedType}`);
  }, [selectedType]);

  // Notify parent component about API loading state changes
  useEffect(() => {
    if (onApiLoadingChange) {
      onApiLoadingChange(isApiLoading);
    }
  }, [isApiLoading, onApiLoadingChange]);

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
                {/* Posts Tab Content */}
                <PostsTab
                  handle={handle}
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={onDateChange}
                  selectedType={selectedType}
                  onTypeChange={onTypeChange || (() => {})}
                  onLoadingStateChange={setIsApiLoading}
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
