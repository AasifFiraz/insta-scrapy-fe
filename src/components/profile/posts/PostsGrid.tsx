import React from 'react';
import { PostType } from '../../../types/postType';
import { PostList } from './PostList';
import { Post } from '../../../types/post';

interface PostsGridProps {
  postType: PostType | 'all';
  startDate?: Date | null;
  endDate?: Date | null;
  posts: Post[];
  isLoading: boolean;
}

export const PostsGrid: React.FC<PostsGridProps> = ({ 
  postType,
  startDate,
  endDate,
  posts,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <PostList 
      posts={posts} 
      postType={postType}
      startDate={startDate}
      endDate={endDate}
    />
  );
};