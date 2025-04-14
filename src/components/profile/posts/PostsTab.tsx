import React, { useState, useEffect } from 'react';
import { useUserInformation } from '../../../hooks/useUserInformation';
import { UserInformation } from '../UserInformation';
import { PostType } from '../../../types/postType';
import { PostList } from './PostList';
import { usePosts } from '../../../hooks/usePosts';
import { useInsightsMetrics } from '../../../hooks/useInsightsMetrics';
import { InsightsMetricsGrid } from '../insights/metrics/InsightsMetricsGrid';
import { SavedAnalytics } from '../save/analytics/SavedAnalytics';



interface PostsTabProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  selectedType: PostType | 'all';
  onTypeChange: (type: PostType | 'all') => void;
}

export const PostsTab: React.FC<PostsTabProps> = ({
  handle,
  startDate,
  endDate,
  onDateChange, // Not used directly here as it's handled by the parent component through the FiltersBar
  selectedType,
  onTypeChange
}) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTypingAnimation, setShowTypingAnimation] = useState<boolean>(true);

  // Fetch user information with typewriter effect
  const { displayedText, isTypingComplete, isLoading: userInfoLoading } = useUserInformation(handle);
  const {
    posts,
    isLoading,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    showPagination
  } = usePosts({ handle, postType: selectedType, startDate, endDate });

  // Use the hook with post type filter for insights data
  const { metrics, isLoading: insightsLoading, error: insightsError } = useInsightsMetrics(handle, startDate, endDate, selectedType);

  // Show content after typewriter animation completes and hide typing animation
  useEffect(() => {
    if (isTypingComplete) {
      setShowContent(true);
      // Add a small delay before hiding the typing animation to ensure smooth transition
      const timer = setTimeout(() => {
        setShowTypingAnimation(false);
      }, 300); // 300ms delay

      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  // Update the parent component's selectedType when it changes in this component
  useEffect(() => {
    // This ensures the parent component's state is updated when the API returns new data
    // based on the selected type
    if (posts && posts.length > 0) {
      onTypeChange(selectedType);
    }
  }, [posts, selectedType, onTypeChange]);

  return (
    <div className="space-y-6">
      {/* User Information with typewriter effect - only shown until typing is complete */}
      {showTypingAnimation && <UserInformation text={displayedText} isLoading={userInfoLoading} />}

      {/* Section Heading - Insights - only shown after typewriter animation completes */}
      {showContent && <h2 className="text-xl font-semibold text-white">Insights</h2>}

      {/* Insights Content - only shown after typewriter animation completes */}
      {showContent && (
        insightsError ? (
          <div className="text-red-500 p-4">
            Failed to load insights metrics: {insightsError}
          </div>
        ) : insightsLoading || !metrics ? (
          <div className="space-y-6">
            {/* Loading skeleton for metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-24 mb-4" />
                  <div className="h-8 bg-white/10 rounded w-32" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Metrics Grid */}
            <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
              <InsightsMetricsGrid metrics={metrics} />
            </div>

            {/* Analytics Components */}
            <SavedAnalytics
              handle={handle}
              startDate={startDate}
              endDate={endDate}
              postType={selectedType}
            />
          </>
        )
      )}

      {/* Section Heading - Posts - only shown after typewriter animation completes */}
      {showContent && <h2 className="text-xl font-semibold text-white mt-10">Posts</h2>}

      {/* Only show PostList after typewriter animation completes */}
      {showContent && (
        <PostList
          posts={posts}
          postType={selectedType}
          startDate={startDate}
          endDate={endDate}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          onNextPage={goToNextPage}
          onPreviousPage={goToPreviousPage}
          showPagination={showPagination}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};