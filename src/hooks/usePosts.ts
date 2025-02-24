import { useState, useEffect } from 'react';
import { Post } from '../types/post';
import { PostType } from '../types/postType';
import { getPosts } from '../services/postsService';
import { differenceInDays } from 'date-fns';

interface UsePostsProps {
  handle: string;
  postType?: PostType | 'all';
  startDate?: Date | null;
  endDate?: Date | null;
}

export const usePosts = ({ handle, postType = 'all', startDate, endDate }: UsePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setPosts([]); // Reset posts when fetching new ones

        // Calculate days from endDate to startDate, default to 7 if not provided
        const days = startDate && endDate 
          ? differenceInDays(endDate, startDate)
          : 7;

        // Only pass postType if it's not 'all'
        const type = postType === 'all' ? undefined : postType;

        // Create a map to store posts in order of completion
        const postsMap = new Map<string, Post>();

        // Callback function to handle completed posts
        const handlePostReady = (readyPost: Post) => {
          postsMap.set(readyPost.id, readyPost);
          // Convert map to array and sort by date
          const sortedPosts = Array.from(postsMap.values())
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setPosts(sortedPosts);
        };

        // Fetch posts with progressive loading
        await getPosts(handle, days, type, handlePostReady);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [handle, postType, startDate, endDate]);

  return { posts, isLoading, error };
}; 