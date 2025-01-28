import { useState, useEffect } from 'react';
import { Post } from '../types/post';
import { PostType } from '../types/postType';
import { fetchProfilePosts } from '../services/postsService';

export const useSavedPosts = (handle: string, postType: PostType | 'all') => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const response = await fetchProfilePosts(handle, undefined, postType);
      if (response.data) {
        setPosts(response.data);
      }
      setIsLoading(false);
    };

    loadPosts();
  }, [handle, postType]);

  return { posts, isLoading };
};