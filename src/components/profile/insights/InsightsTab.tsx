import React, { useState } from 'react';
import { Image, Images, Film, LayoutGrid } from 'lucide-react';
import { PostType } from '../../../types/postType';
import { DateRangeSelector } from '../save/DateRangeSelector';
import { InsightsMetricsGrid } from './metrics/InsightsMetricsGrid';
import { SavedAnalytics } from '../save/analytics/SavedAnalytics';
import { useInsightsMetrics } from '../../../hooks/useInsightsMetrics';

interface InsightsTabProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
}

export const InsightsTab: React.FC<InsightsTabProps> = ({ 
  handle,
  startDate,
  endDate,
  onDateChange
}) => {
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');
  const { metrics, isLoading, error } = useInsightsMetrics(handle);

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Failed to load insights metrics: {error}
      </div>
    );
  }

  if (isLoading || !metrics) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton for metrics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-24 mb-4" />
              <div className="h-8 bg-white/10 rounded w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mobile Filters */}
      <div className="sm:hidden space-y-4">
        {/* Post Type Filter */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setSelectedType('all')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'all'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setSelectedType('image')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'image'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Image className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setSelectedType('carousel')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'carousel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Images className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setSelectedType('reel')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'reel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 mx-auto" />
          </button>
        </div>

        {/* Date Range Selector */}
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange || (() => {})}
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:flex sm:items-center justify-between gap-4">
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'all'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setSelectedType('image')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'image'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setSelectedType('carousel')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'carousel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Carousels
          </button>
          <button
            onClick={() => setSelectedType('reel')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'reel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Reels
          </button>
        </div>
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange || (() => {})}
        />
      </div>

      {/* Metrics Grid */}
      <div className="px-4 -mx-4 sm:px-0 sm:mx-0">
        <InsightsMetricsGrid metrics={metrics} />
      </div>

      {/* Analytics Components */}
      <SavedAnalytics 
        handle={handle}
        startDate={startDate}
        endDate={endDate}
        postType={selectedType}
      />
    </div>
  );
};