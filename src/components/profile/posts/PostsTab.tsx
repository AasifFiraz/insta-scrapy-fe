import React, { useState } from 'react';
import { Image, Images, Film, LayoutGrid } from 'lucide-react';
import { PostType } from '../../../types/postType';
import { PostList } from './PostList';
import { DateRangeSelector } from '../save/DateRangeSelector';
import { usePosts } from '../../../hooks/usePosts';

interface PostsTabProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDateChange?: (start: Date | null, end: Date | null) => void;
}

export const PostsTab: React.FC<PostsTabProps> = ({ 
  handle,
  startDate,
  endDate,
  onDateChange
}) => {
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');
  const { 
    posts, 
    isLoading, 
    currentPage,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    showPagination
  } = usePosts({ handle, postType: selectedType, startDate, endDate });

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
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            <LayoutGrid className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={() => setSelectedType('image')}
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
            onClick={() => setSelectedType('carousel')}
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
            onClick={() => setSelectedType('reel')}
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
                : 'text-gray-400'
            } ${isLoading ? 'cursor-not-allowed opacity-50' : 'hover:text-white'}`}
            disabled={isLoading}
          >
            All Posts
          </button>
          <button
            onClick={() => setSelectedType('image')}
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
            onClick={() => setSelectedType('carousel')}
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
            onClick={() => setSelectedType('reel')}
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
        />
      </div>

      <PostList 
        posts={posts} 
        postType={selectedType}
        startDate={startDate}
        endDate={endDate}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        showPagination={showPagination}
        isLoading={isLoading}
      />
    </div>
  );
};