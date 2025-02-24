import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { User, Grid, Lightbulb, MessageCircle } from 'lucide-react';
import { TimeRangeFilter } from '../filters/TimeRangeFilter';
import { useTimeRange } from '../context/TimeRangeContext';
import { ProBadge } from '../../common/ProBadge';

const TABS = [
  { id: 'analytics', label: 'Profile', icon: User, isPro: false },
  { id: 'posts', label: 'Posts', icon: Grid, isPro: true },
  { id: 'insights', label: 'Insights', icon: Lightbulb, isPro: true },
  { id: 'chat', label: 'Chat', icon: MessageCircle, isPro: true }
] as const;

type TabId = typeof TABS[number]['id'];

interface TabListProps {
  handle: string;
}

export const TabList: React.FC<TabListProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabId) || 'analytics';
  const { timeRange, setTimeRange } = useTimeRange();

  const handleTabClick = (tabId: TabId) => {
    setSearchParams({ tab: tabId });
  };

  // Only show time range filter for analytics tab and not on insights tab
  const showTimeRange = activeTab === 'analytics';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Mobile Tabs */}
      <div className="sm:hidden flex gap-2 bg-white/5 rounded-lg p-1">
        {TABS.map(({ id, label, icon: Icon, isPro }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`flex-1 p-2 rounded-md transition-colors ${
              activeTab === id
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
            title={label}
          >
            <div className="relative inline-flex flex-col items-center">
              <Icon className="w-4 h-4" />
              {isPro && (
                <ProBadge className="absolute -top-1 -right-6" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex items-center gap-2">
        {TABS.map(({ id, label, icon: Icon, isPro }) => (
          <button
            key={id}
            onClick={() => handleTabClick(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === id
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
            {isPro && <ProBadge />}
          </button>
        ))}
      </div>

      {/* Time Range Filter - Only show on desktop and for analytics tab */}
      <div className="hidden sm:flex items-center gap-4">
        {showTimeRange && (
          <TimeRangeFilter
            selectedRange={timeRange}
            onChange={setTimeRange}
          />
        )}
      </div>
    </div>
  );
};