import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useSavedGrowthData } from '../../../../hooks/useSavedGrowthData';
import { formatNumber } from '../../../../utils/numberFormat';
import { SavedChartTooltip } from './SavedChartTooltip';

interface SavedGrowthChartProps {
  handle: string;
}

export const SavedGrowthChart: React.FC<SavedGrowthChartProps> = ({ handle }) => {
  const { data, isLoading } = useSavedGrowthData(handle);

  if (isLoading) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-white/10 rounded w-48" />
          <div className="h-[300px] bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Follower Growth</h3>
        </div>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
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
            <Tooltip content={<SavedChartTooltip />} />
            <Area
              type="monotone"
              dataKey="followers"
              stroke="url(#growthGradient)"
              fill="url(#growthGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};