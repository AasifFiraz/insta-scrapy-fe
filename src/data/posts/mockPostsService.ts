import { PostsResponse } from '../../types/post';
import { PostType } from '../../types/postType';
import { generateMockPosts } from './generators';

const POSTS_PER_PAGE = 12;

export const getMockPosts = async (
  handle: string,
  cursor?: string,
  postType: PostType | 'all' = 'all'
): Promise<PostsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const allPosts = generateMockPosts(handle);
  const filteredPosts = postType === 'all' 
    ? allPosts 
    : allPosts.filter(post => post.type === postType);

  const page = cursor ? parseInt(cursor) : 0;
  const posts = filteredPosts.slice(
    page * POSTS_PER_PAGE,
    (page + 1) * POSTS_PER_PAGE
  );

  return {
    data: posts,
    pagination: {
      hasMore: posts.length === POSTS_PER_PAGE,
      nextCursor: posts.length === POSTS_PER_PAGE ? String(page + 1) : undefined
    }
  };
};