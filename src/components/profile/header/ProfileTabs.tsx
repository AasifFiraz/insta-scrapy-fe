import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Grid, Lock } from 'lucide-react';
import { TimeRangeFilter } from '../filters/TimeRangeFilter';
import { useTimeRange } from '../context/TimeRangeContext';
import { DateRangeSelector } from '../save/DateRangeSelector';
import { ProBadge } from '../../common/ProBadge';
import { MobileFiltersBar } from '../filters/MobileFiltersBar';
import { useAuth } from '../../../hooks/useAuth';

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
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  startDate,
  endDate,
  onDateChange
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
    setSearchParams({ tab: tabId });
  };

  // Show time range filter for analytics tab
  const showTimeRange = activeTab === 'analytics';
  // Show date range selector for posts tab
  const showDateRange = activeTab === 'posts';

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile Tabs */}
      <div className="sm:hidden space-y-4">
        {/* Tab buttons */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          {TABS.map(({ id, label, icon: Icon, isPro }) => {
            const isDisabled = !isAuthenticated && id === 'posts';
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
          startDate={showDateRange ? startDate : undefined}
          endDate={showDateRange ? endDate : undefined}
          onDateChange={showDateRange ? onDateChange : undefined}
          showTimeRange={showTimeRange}
        />
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex items-center justify-between">
        <div className="flex items-center gap-2">
          {TABS.map(({ id, label, icon: Icon, isPro }) => {
            const isDisabled = !isAuthenticated && id === 'posts';
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
        
        {/* Desktop Filters */}
        <div className="flex items-center gap-4">
          {showTimeRange && (
            <TimeRangeFilter
              selectedRange={timeRange}
              onChange={setTimeRange}
            />
          )}
          {showDateRange && onDateChange && isAuthenticated && (
            <DateRangeSelector
              startDate={startDate}
              endDate={endDate}
              onDateChange={onDateChange}
              maxDays={90}
            />
          )}
        </div>
      </div>
    </div>
  );
};