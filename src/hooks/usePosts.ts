import { useState, useEffect, useCallback } from 'react';
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

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export const usePosts = ({ handle, postType = 'all', startDate, endDate }: UsePostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 0
  });
  // Track if we've reached the end of available posts (received empty array)
  const [reachedEnd, setReachedEnd] = useState(false);
  
  // Reset pagination when postType changes
  useEffect(() => {
    setCurrentPage(1);
    setReachedEnd(false);
  }, [postType, startDate, endDate]);

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
        const response = await getPosts(handle, days, type, currentPage, handlePostReady);
        
        // Update reached end flag if we get an empty array
        if (response.posts.length === 0 && currentPage > 1) {
          setReachedEnd(true);
        } else if (response.posts.length > 0) {
          // If we get posts, we haven't reached the end
          setReachedEnd(false);
        }
        
        setPosts(response.posts);
        setPagination({
          page: response.pagination.page,
          pageSize: response.pagination.page_size,
          total: response.pagination.total,
          totalPages: response.pagination.total_pages
        });
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [handle, postType, startDate, endDate, currentPage]);

  const goToNextPage = useCallback(() => {
    // Allow moving to the next page if we haven't explicitly reached the end
    if (!reachedEnd) {
      setCurrentPage(prev => prev + 1);
    }
  }, [reachedEnd]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Should we show pagination controls? Hide them if no posts on page 1
  const showPagination = !(posts.length === 0 && currentPage === 1);
  
  // Determine if Next button should be enabled
  // Only disable Next if we've received an empty array (reached end)
  const hasNextPage = !reachedEnd;
  
  // Has previous page if we're not on page 1
  const hasPreviousPage = currentPage > 1;

  return { 
    posts, 
    isLoading, 
    error,
    pagination,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
    showPagination
  };
}; 