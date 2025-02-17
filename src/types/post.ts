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
  topic: string;
  goal: string;
  angle: string;
  copy: {
    post: string;
    caption: string;
    postStructure: string;
    captionStructure: string;
  };
}

export interface PostsResponse {
  data: Post[];
  pagination: {
    hasMore: boolean;
    nextCursor?: string;
  };
  error?: string;
}