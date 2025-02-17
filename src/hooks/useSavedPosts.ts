import { useState, useEffect } from 'react';
import { Post } from '../types/post';
import { PostType } from '../types/postType';
import { getPosts } from '../services/postsService';

export const useSavedPosts = (handle: string, postType: PostType | 'all') => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      // Only pass postType if it's not 'all'
      const type = postType === 'all' ? undefined : postType;
      const fetchedPosts = await getPosts(handle, 7, type);
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    loadPosts();
  }, [handle, postType]);

  return { posts, isLoading };
};