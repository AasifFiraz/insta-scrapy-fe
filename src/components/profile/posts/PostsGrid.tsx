import React from 'react';
import { Post } from '../../../types/post';
import { PostType } from '../../../types/postType';
import { PostList } from './PostList';
import { usePosts } from '../../../hooks/usePosts';

interface PostsGridProps {
  handle: string;
  postType: PostType | 'all';
  startDate?: Date | null;
  endDate?: Date | null;
}

export const PostsGrid: React.FC<PostsGridProps> = ({ 
  handle, 
  postType,
  startDate,
  endDate
}) => {
  const { posts, isLoading } = usePosts({
    handle,
    postType,
    startDate,
    endDate
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return <PostList posts={posts} />;
};