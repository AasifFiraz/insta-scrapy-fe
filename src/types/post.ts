import { PostType } from './postType';

export interface Post {
  id: string;
  thumbnail: string;
  caption: string;
  type: PostType;
  stats: {
    likes: number;
    comments: number;
  };
  createdAt: string;
}

export interface PostsResponse {
  data: Post[];
  pagination: {
    hasMore: boolean;
    nextCursor?: string;
  };
  error?: string;
}