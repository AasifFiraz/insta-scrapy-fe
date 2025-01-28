import React, { useState } from 'react';
import { PostTypeFilter, PostType } from '../analytics/goals/PostTypeFilter';
import { SavedPostList } from './SavedPostList';
import { PostsSorting, SortOption } from '../../posts/PostsSorting';

interface SavedPostsProps {
  handle: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const SavedPosts: React.FC<SavedPostsProps> = ({ 
  handle,
  startDate,
  endDate
}) => {
  const [selectedType, setSelectedType] = useState<PostType>('image');
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PostTypeFilter 
          selectedType={selectedType}
          onChange={setSelectedType}
        />
        <PostsSorting 
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
      <SavedPostList 
        handle={handle}
        postType={selectedType}
        sortBy={sortBy}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};