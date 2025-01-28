import React from 'react';
import { MetricType, TimeRange } from './types';

interface ChartControlsProps {
  selectedMetric: MetricType;
  timeRange: TimeRange;
  onMetricChange: (metric: MetricType) => void;
  onTimeRangeChange: (range: TimeRange) => void;
}

export const ChartControls: React.FC<ChartControlsProps> = ({
  selectedMetric,
  timeRange,
  onMetricChange,
  onTimeRangeChange,
}) => {
  const metrics: { value: MetricType; label: string }[] = [
    { value: 'followers', label: 'Followers' },
    { value: 'engagement', label: 'Engagement' },
  ];

  const timeRanges: TimeRange[] = ['7D', '28D', '90D'];

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        {metrics.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onMetricChange(value)}
            className={`text-lg font-semibold ${
              selectedMetric === value ? 'text-white' : 'text-gray-400'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => onTimeRangeChange(range)}
            className={`px-3 py-1 rounded-lg text-sm ${
              timeRange === range
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
};