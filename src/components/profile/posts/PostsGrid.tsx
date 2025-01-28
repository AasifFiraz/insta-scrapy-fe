import React from 'react';
import { Post } from '../../../types/post';
import { PostType } from '../../../types/postType';
import { PostList } from './PostList';
import { useSavedPosts } from '../../../hooks/useSavedPosts';
import { isWithinInterval } from 'date-fns';

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
  const { posts, isLoading } = useSavedPosts(handle, postType);

  // Filter posts by date range
  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];
    
    let filtered = [...posts];

    // Apply date filtering if both dates are provided
    if (startDate && endDate) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.createdAt);
        return isWithinInterval(postDate, { start: startDate, end: endDate });
      });
    }
    
    // Sort by most recent first
    return filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [posts, startDate, endDate]);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-24 bg-white/5 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return <PostList posts={filteredPosts} />;
};