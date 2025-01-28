import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalMetric } from './types';
import { GrowthDataPoint } from '../../../../../types/save';
import { formatNumber } from '../../../../../utils/numberFormat';
import { isWithinInterval, parseISO, format } from 'date-fns';

interface HistoricalChartProps {
  data: GrowthDataPoint[];
  metric: HistoricalMetric;
  totalPosts: number;
  totalFollowers: number;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({
  data,
  metric,
  totalPosts,
  totalFollowers,
  startDate,
  endDate
}) => {
  const chartData = useMemo(() => {
    // Filter data based on date range if provided
    let filteredData = [...data];
    if (startDate && endDate) {
      filteredData = data.filter(point => {
        const date = parseISO(point.date);
        return isWithinInterval(date, { start: startDate, end: endDate });
      });
    }

    return filteredData.map((point, index) => {
      const prevPoint = index > 0 ? filteredData[index - 1] : point;
      const daysInPeriod = filteredData.length;
      
      let value = 0;
      switch (metric) {
        case 'newFollowers':
          value = point.followers - prevPoint.followers;
          break;
        case 'followerGrowthDaily':
          value = (point.followers - prevPoint.followers);
          break;
        case 'newPosts':
          value = Math.round(totalPosts * ((index + 1) / daysInPeriod) - (totalPosts * (index / daysInPeriod)));
          break;
        case 'postingFrequency':
          value = totalPosts / daysInPeriod;
          break;
        case 'newLikes':
          value = point.engagement * 0.7;
          break;
        case 'newComments':
          value = point.engagement * 0.3;
          break;
        case 'likesPerPost':
          value = (point.engagement * 0.7) / (totalPosts / daysInPeriod);
          break;
        case 'commentsPerPost':
          value = (point.engagement * 0.3) / (totalPosts / daysInPeriod);
          break;
        case 'engagementRate':
          value = (point.engagement / point.followers) * 100;
          break;
        default:
          value = 0;
      }

      // Format date consistently
      const date = parseISO(point.date);
      return {
        date: format(date, 'MMM d'),
        value
      };
    });
  }, [data, metric, totalPosts, totalFollowers, startDate, endDate]);

  const formatYAxis = (value: number) => {
    if (metric === 'engagementRate') {
      return `${value.toFixed(1)}%`;
    }
    return formatNumber(value);
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
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
            tickFormatter={formatYAxis}
            width={60}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload[0]) return null;
              
              return (
                <div className="bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-white/20">
                  <p className="text-white font-medium">{payload[0].payload.date}</p>
                  <p className="text-gray-300">
                    {formatYAxis(payload[0].value)}
                  </p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="url(#gradientArea)"
            fill="url(#gradientArea)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};