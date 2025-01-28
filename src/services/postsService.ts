import { Post, PostsResponse } from '../types/post';
import { PostType } from '../types/postType';
import { getMockPosts } from '../data/posts/mockPostsService';

export const fetchProfilePosts = async (
  handle: string,
  cursor?: string,
  postType: PostType | 'all' = 'all'
): Promise<PostsResponse> => {
  try {
    return await getMockPosts(handle, cursor, postType);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      data: [],
      pagination: {
        hasMore: false
      },
      error: 'Failed to load posts'
    };
  }
};