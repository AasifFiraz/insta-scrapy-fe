import React from 'react';
import { Image, Images, Film, LayoutGrid } from 'lucide-react';
import { PostType } from '../../../types/postType';
import { DateRangeSelector } from '../save/DateRangeSelector';

interface FiltersBarProps {
  selectedType: PostType | 'all';
  onTypeChange: (type: PostType | 'all') => void;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
  isLoading?: boolean;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  selectedType,
  onTypeChange,
  startDate,
  endDate,
  onDateChange,
  isLoading = false
}) => {
  return (
    <div className="space-y-4">
      {/* Mobile Filters */}
      <div className="sm:hidden space-y-4">
        {/* Post Type Filter */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => onTypeChange('all')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'all'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <LayoutGrid className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => onTypeChange('image')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'image'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <Image className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => onTypeChange('carousel')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'carousel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <Images className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => onTypeChange('reel')}
            className={`flex-1 p-2 rounded-md transition-colors ${
              selectedType === 'reel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <Film className="w-4 h-4 mx-auto" />
          </button>
        </div>

        {/* Date Range Selector */}
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange || (() => {})}
          maxDays={90}
          isLoading={isLoading}
        />
      </div>

      {/* Desktop Filters */}
      <div className="hidden sm:flex sm:items-center justify-between gap-4">
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => onTypeChange('all')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'all'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            All Posts
          </button>
          <button
            onClick={() => onTypeChange('image')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'image'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            Images
          </button>
          <button
            onClick={() => onTypeChange('carousel')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'carousel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            Carousels
          </button>
          <button
            onClick={() => onTypeChange('reel')}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              selectedType === 'reel'
                ? 'bg-white/10 text-white'
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            Reels
          </button>
        </div>

        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange || (() => {})}
          maxDays={90}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
