import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricType, TimeRange, DataPoint } from '../../../types/metrics';
import { ChartControls } from './ChartControls';
import { fetchMetricsData } from '../../../services/metricsService';
import { formatNumber } from '../../../utils/numberFormat';
import { CustomTooltip } from './CustomTooltip';

interface EngagementChartProps {
  handle: string;
}

export const EngagementChart: React.FC<EngagementChartProps> = ({ handle }) => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('followers');
  const [timeRange, setTimeRange] = useState<TimeRange>('28D');
  const [data, setData] = useState<DataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMetricsData = async () => {
      setIsLoading(true);
      const response = await fetchMetricsData(handle, selectedMetric, timeRange);
      if (!response.error && response.data) {
        setData(response.data);
      }
      setIsLoading(false);
    };

    loadMetricsData();
  }, [handle, selectedMetric, timeRange]);

  const currentValue = data.length > 0 ? data[data.length - 1].value : 0;
  const previousValue = data.length > 0 ? data[0].value : 0;
  const change = currentValue - previousValue;

  if (isLoading) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-white/10 rounded" />
          <div className="h-64 bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            {formatNumber(currentValue)}
          </span>
          <span className={`text-sm ${change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {change >= 0 ? '+' : ''}{formatNumber(change)}
          </span>
        </div>
      </div>

      <ChartControls
        selectedMetric={selectedMetric}
        timeRange={timeRange}
        onMetricChange={setSelectedMetric}
        onTimeRangeChange={setTimeRange}
      />
      
      <div className="mt-8" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EC4899" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={formatNumber}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#colorGradient)"
              fill="url(#colorGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};