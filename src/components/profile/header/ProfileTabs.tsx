import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Grid, Lock } from 'lucide-react';
import { TimeRangeFilter } from '../filters/TimeRangeFilter';
import { useTimeRange } from '../context/TimeRangeContext';
import { DateRangeSelector } from '../save/DateRangeSelector';
import { ProBadge } from '../../common/ProBadge';
import { MobileFiltersBar } from '../filters/MobileFiltersBar';
import { useAuth } from '../../../hooks/useAuth';
import { PostType } from '../../../types/postType';

interface TabConfig {
  id: 'analytics' | 'posts';
  label: string;
  icon: React.FC<{ className?: string }>;
  isPro?: boolean;
}

const TABS: readonly TabConfig[] = [
  { id: 'analytics', label: 'Profile', icon: User },
  { id: 'posts', label: 'Posts', icon: Grid, isPro: true }
] as const;

type TabId = typeof TABS[number]['id'];

interface ProfileTabsProps {
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  isApiLoading?: boolean;
  selectedType?: PostType | 'all';
  onTypeChange?: (type: PostType | 'all') => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  startDate,
  endDate,
  onDateChange,
  isApiLoading = false,
  selectedType = 'all',
  onTypeChange
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabId) || 'analytics';
  const { timeRange, setTimeRange } = useTimeRange();
  const { isAuthenticated } = useAuth();

  const handleTabClick = (tabId: TabId) => {
    // Only allow switching to posts if authenticated
    if (!isAuthenticated && tabId === 'posts') {
      return;
    }
    // Prevent tab switching during API calls
    if (isApiLoading && activeTab === 'posts') {
      return;
    }
    setSearchParams({ tab: tabId });
  };

  // Show time range filter for analytics tab
  const showTimeRange = activeTab === 'analytics';
  // Show date range selector and post type filters for posts tab
  const showPostFilters = activeTab === 'posts' && isAuthenticated;
  
  // Handle post type change
  const handleTypeChange = (type: PostType | 'all') => {
    if (onTypeChange) {
      onTypeChange(type);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Tabs */}
      <div className="sm:hidden space-y-4">
        {/* Tab buttons */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          {TABS.map(({ id, label, icon: Icon, isPro }) => {
            const isDisabled = (!isAuthenticated && id === 'posts') || (isApiLoading && activeTab === 'posts' && id === 'analytics');
            return (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                disabled={isDisabled}
                className={`flex-1 p-2 rounded-md transition-colors ${
                  activeTab === id
                    ? 'bg-white/10 text-white'
                    : isDisabled
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 hover:text-white'
                }`}
                title={isDisabled ? 'Sign in to access this feature' : label}
              >
                <div className="relative inline-flex flex-col items-center">
                  {isDisabled ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  {isPro && (
                    <ProBadge className="absolute -top-1 -right-6" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Filters Bar */}
        <MobileFiltersBar
          timeRange={showTimeRange ? timeRange : undefined}
          onTimeRangeChange={showTimeRange ? setTimeRange : undefined}
          startDate={showPostFilters ? startDate : undefined}
          endDate={showPostFilters ? endDate : undefined}
          onDateChange={showPostFilters ? onDateChange : undefined}
          showTimeRange={showTimeRange}
        />
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {TABS.map(({ id, label, icon: Icon, isPro }) => {
              const isDisabled = (!isAuthenticated && id === 'posts') || (isApiLoading && activeTab === 'posts' && id === 'analytics');
              return (
                <button
                  key={id}
                  onClick={() => handleTabClick(id)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === id
                      ? 'bg-white/10 text-white'
                      : isDisabled
                      ? 'text-gray-600 cursor-not-allowed'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={isDisabled ? 'Sign in to access this feature' : undefined}
                >
                  {isDisabled ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                  <span>{label}</span>
                  {isPro && (
                    <ProBadge />
                  )}
                </button>
              );
            })}
          </div>

          {/* Time Range Filter (only for analytics tab) */}
          <div className="flex items-center gap-4">
            {showTimeRange && (
              <TimeRangeFilter
                selectedRange={timeRange}
                onChange={setTimeRange}
              />
            )}
          </div>
        </div>

        {/* Post Filters - Below Tabs */}
        {showPostFilters && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-between">
            {/* Post Type Filters */}
            <div className="flex gap-2 bg-white/5 rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() => handleTypeChange('all')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedType === 'all'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400'
                } ${isApiLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
                disabled={isApiLoading}
              >
                All Posts
              </button>
              <button
                onClick={() => handleTypeChange('image')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedType === 'image'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400'
                } ${isApiLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
                disabled={isApiLoading}
              >
                Images
              </button>
              <button
                onClick={() => handleTypeChange('carousel')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedType === 'carousel'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400'
                } ${isApiLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
                disabled={isApiLoading}
              >
                Carousels
              </button>
              <button
                onClick={() => handleTypeChange('reel')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  selectedType === 'reel'
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400'
                } ${isApiLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
                disabled={isApiLoading}
              >
                Reels
              </button>
            </div>

            {/* Date Range Selector */}
            {onDateChange && (
              <div className="w-full sm:w-auto">
                <DateRangeSelector
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={onDateChange}
                  maxDays={90}
                  isLoading={isApiLoading}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};