import React from 'react';
import { TimeRange } from '../../../types/metrics';

interface TimeRangeFilterProps {
  selectedRange: TimeRange;
  onChange: (range: TimeRange) => void;
}

export const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
  selectedRange,
  onChange,
}) => {
  const ranges: TimeRange[] = ['7D', '28D', '90D'];

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onChange(range)}
          className={`px-3 py-1 rounded-lg text-sm ${
            selectedRange === range
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};