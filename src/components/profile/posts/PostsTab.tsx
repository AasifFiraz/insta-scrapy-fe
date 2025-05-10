import React, { useState, useEffect, useCallback } from 'react';
import { useUserInformation } from '../../../hooks/useUserInformation';
import { UserInformation } from '../UserInformation';
import { PostType } from '../../../types/postType';
import { PostList } from './PostList';
import { usePosts } from '../../../hooks/usePosts';
import { InsightsMetricsGrid } from '../insights/metrics/InsightsMetricsGrid';
import { SavedAnalytics } from '../save/analytics/SavedAnalytics';
import { InsightsProvider, useInsights } from '../../../context/InsightsContext';


interface PostsTabProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  selectedType: PostType | 'all';
  onTypeChange: (type: PostType | 'all') => void;
  onLoadingStateChange?: (isLoading: boolean) => void;
}

export const PostsTab: React.FC<PostsTabProps> = ({
  handle,
  startDate,
  endDate,
  selectedType,
  onTypeChange,
  onLoadingStateChange
}) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [showTypingAnimation, setShowTypingAnimation] = useState<boolean>(true);
  const [apiCallsComplete, setApiCallsComplete] = useState<boolean>(false);
  const [insightsLoading, setInsightsLoading] = useState<boolean>(true);

  // Fetch user information with typewriter effect
  const { displayedText, isTypingComplete, isLoading: userInfoLoading, completeTyping } = useUserInformation(handle);
  const {
    posts,
    isLoading: postsLoading,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    showPagination
  } = usePosts({ handle, postType: selectedType, startDate, endDate });

  // We'll use the InsightsContext instead of directly calling useInsightsMetrics
  // Note: We use functional state updates to prevent infinite re-renders and excessive logging
  // We also use React.memo and separate effects to prevent "Cannot update a component while rendering a different component" errors

  // Handle skipping the typewriter animation
  const handleSkipAnimation = useCallback(() => {
    // First, force complete the typewriter animation to stop it from running in the background
    completeTyping();

    // Then show the content and hide the animation container
    setShowContent(true);

    // Add a small delay before hiding the animation container to ensure smooth transition
    setTimeout(() => {
      setShowTypingAnimation(false);
    }, 50);
  }, [postsLoading, insightsLoading, completeTyping]);

  // Show content after typewriter animation completes and hide typing animation
  useEffect(() => {
    if (isTypingComplete) {
      // Show the content immediately
      setShowContent(true);

      // Add a small delay before hiding the typing animation to ensure smooth transition
      const timer = setTimeout(() => {
        setShowTypingAnimation(false);
      }, 300); // 300ms delay

      return () => clearTimeout(timer);
    }
  }, [isTypingComplete]);

  // Log when the selectedType prop changes but don't force re-fetches here
  useEffect(() => {
    console.log(`PostsTab: selectedType changed to ${selectedType}`);
    
    // Just update UI states to show loading indicators
    // The actual API calls will be handled by the respective hooks
    setApiCallsComplete(false);
  }, [selectedType]);
  
  // Ensure the parent component is aware of the current selectedType
  useEffect(() => {
    // This helps maintain consistency between components
    if (onTypeChange) {
      onTypeChange(selectedType);
    }
  }, [selectedType, onTypeChange]);

  // Track posts loading state changes to update apiCallsComplete

  // Update apiCallsComplete when either posts or insights loading state changes
  useEffect(() => {
    const isComplete = !postsLoading && !insightsLoading;

    // Only update and log if the completion status has changed
    setApiCallsComplete(prevState => {
      if (prevState !== isComplete) {
        return isComplete;
      }
      return prevState;
    });

    // Notify parent component about loading state in a separate effect to avoid
    // causing re-renders during render phase
  }, [postsLoading, insightsLoading]);

  // Separate effect for notifying parent component to avoid setState during render
  useEffect(() => {
    // Only notify parent when apiCallsComplete changes
    if (onLoadingStateChange) {
      onLoadingStateChange(!apiCallsComplete);
    }
  }, [apiCallsComplete, onLoadingStateChange]);

  // Component to track insights loading state - will be rendered regardless of showContent
  const InsightsLoadingTracker = React.memo(() => {
    const { isLoading } = useInsights();

    // Update parent component's insightsLoading state only when it changes
    useEffect(() => {
      // Only log and update state when the loading state actually changes
      setInsightsLoading(prevState => {
        if (prevState !== isLoading) {
          return isLoading;
        }
        return prevState;
      });
    }, [isLoading]);

    return null; // This component doesn't render anything
  });

  // Create a component that uses the InsightsContext to display content
  const InsightsContent = React.memo(() => {
    const { metrics, isLoading, error: insightsError } = useInsights();

    if (insightsError) {
      return (
        <div className="text-red-500 p-4">
          Failed to load insights metrics: {insightsError}
        </div>
      );
    }

    // Show loading state when insights are being fetched
    if (isLoading) {
      return (
        <div className="space-y-6">
          {/* Informative message about insights loading */}
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <p className="text-white mb-3">Insights are currently being fetched, please give it a few minutes and come back.</p>
            <p className="text-gray-400 text-sm">We're analyzing the profile data to provide you with valuable insights.</p>
          </div>
        </div>
      );
    }

    // Show message when no metrics are available
    if (!metrics) {
      return (
        <div className="space-y-6">
          {/* Informative message about missing insights */}
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <p className="text-white mb-3">No insights data is available for this profile.</p>
            <p className="text-gray-400 text-sm">Try adjusting the date range or check back later.</p>
          </div>
        </div>
      );
    }

    return (
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
    );
  });

  return (
    <div className="space-y-6">
      {/* User Information with typewriter effect - only shown until typing is complete */}
      {showTypingAnimation && (
        <div className="relative">
          <UserInformation text={displayedText} isLoading={userInfoLoading} />
          {/* White cross icon to skip animation - only shown when API calls are complete */}
          {apiCallsComplete && (
            <button
              onClick={handleSkipAnimation}
              className="absolute top-0 right-0 p-2 text-white hover:text-white/70 transition-colors rounded-full bg-black/20 hover:bg-black/40"
              aria-label="Skip animation"
              title="Skip animation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Initialize InsightsProvider early to start loading data during typewriter animation */}
      <InsightsProvider
        handle={handle}
        startDate={startDate}
        endDate={endDate}
        postType={selectedType}
      >
        {/* Always render the loading tracker to monitor insights loading state */}
        <InsightsLoadingTracker />

        {/* Only show insights content after typewriter animation completes */}
        {showContent && (
          <>
            {/* Section Heading - Insights */}
            <h2 className="text-xl font-semibold text-white">Insights</h2>

            {/* Insights Content */}
            <InsightsContent />
          </>
        )}
      </InsightsProvider>

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
          isLoading={postsLoading}
        />
      )}
    </div>
  );
};