import React from 'react';
import { TimeRange } from '../../../types/metrics';
import { DateRangeSelector } from '../save/DateRangeSelector';
import { MobileFilterStats } from './MobileFilterStats';

interface MobileFiltersBarProps {
  timeRange?: TimeRange;
  onTimeRangeChange?: (range: TimeRange) => void;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  stats?: {
    totalPosts: number;
    totalEngagement: number;
    averageEngagement: number;
  };
  showTimeRange?: boolean;
}

export const MobileFiltersBar: React.FC<MobileFiltersBarProps> = ({
  timeRange,
  onTimeRangeChange,
  startDate,
  endDate,
  onDateChange,
  stats,
  showTimeRange = true
}) => {
  const ranges: TimeRange[] = ['7D', '28D', '90D'];

  // Don't render anything if there's no content to show
  if (!showTimeRange && !stats) {
    return null;
  }

  return (
    <div className="bg-white/5 rounded-lg p-3">
      <div className="space-y-3">
        {/* Time range buttons - only show if showTimeRange is true */}
        {showTimeRange && (
          <div className="grid grid-cols-3 gap-2">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => onTimeRangeChange?.(range)}
                className={`px-3 py-2 rounded-lg text-sm ${
                  timeRange === range && !startDate && !endDate
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <>
            {showTimeRange && <div className="border-t border-white/10" />}
            <MobileFilterStats {...stats} />
          </>
        )}
      </div>
    </div>
  );
};