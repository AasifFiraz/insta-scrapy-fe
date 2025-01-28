import React, { useState } from 'react';
import { HistoricalChart } from './HistoricalChart';
import { MetricSelector } from './MetricSelector';
import { HistoricalMetric } from './types';
import { useSavedAnalytics } from '../../../../../hooks/useSavedAnalytics';
import { TrendingUp } from 'lucide-react';

interface HistoricalAnalysisProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const HistoricalAnalysis: React.FC<HistoricalAnalysisProps> = ({ 
  handle,
  startDate,
  endDate
}) => {
  const [selectedMetric, setSelectedMetric] = useState<HistoricalMetric>('newFollowers');
  const { data, isLoading } = useSavedAnalytics(handle, startDate, endDate);

  if (isLoading) {
    return (
      <div className="bg-white/5 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/10 rounded w-48" />
          <div className="h-[400px] bg-white/5 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h3 className="text-white font-semibold">Historical Analysis</h3>
        </div>
        <MetricSelector 
          selectedMetric={selectedMetric} 
          onChange={setSelectedMetric}
        />
      </div>
      <HistoricalChart 
        data={data.growthData}
        metric={selectedMetric}
        totalPosts={data.totalPosts}
        totalFollowers={data.totalFollowers}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};