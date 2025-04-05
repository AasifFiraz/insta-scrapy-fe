import React, { useState, useEffect } from 'react';
import { Image, Images, Film, LayoutGrid } from 'lucide-react';
import { useUserInformation } from '../../../hooks/useUserInformation';
import { UserInformation } from '../UserInformation';
import { PostType } from '../../../types/postType';
import { PostList } from './PostList';
import { DateRangeSelector } from '../save/DateRangeSelector';
import { usePosts } from '../../../hooks/usePosts';
import { useInsightsMetrics } from '../../../hooks/useInsightsMetrics';
import { InsightsMetricsGrid } from '../insights/metrics/InsightsMetricsGrid';
import { SavedAnalytics } from '../save/analytics/SavedAnalytics';



interface PostsTabProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;

}

export const PostsTab: React.FC<PostsTabProps> = ({
  handle,
  startDate,
  endDate,
  onDateChange
}) => {
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');
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

      {/* Mobile Filters - only shown after typewriter animation completes */}
      {showContent && <div className="sm:hidden space-y-4">
        {/* Post Type Filter */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setSelectedType('all')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'all'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <LayoutGrid className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setSelectedType('image')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'image'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <Image className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setSelectedType('carousel')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'carousel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <Images className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setSelectedType('reel')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'reel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <Film className="w-4 h-4 mx-auto" />
          </button>
        </div>

        {/* Date Range Selector */}
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange || (() => {})}
          maxDays={90}
        />
      </div>}

      {/* Desktop Filters - only shown after typewriter animation completes */}
      {showContent && <div className="hidden sm:flex sm:items-center justify-between gap-4">
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'all'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            All Posts
          </button>
          <button
            onClick={() => setSelectedType('image')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'image'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            Images
          </button>
          <button
            onClick={() => setSelectedType('carousel')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'carousel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            Carousels
          </button>
          <button
            onClick={() => setSelectedType('reel')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'reel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            Reels
          </button>
        </div>

        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange || (() => {})}
          maxDays={90}
        />
      </div>}

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