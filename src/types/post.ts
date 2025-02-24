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
  context: {
    user: {
      full_name: string;
      username: string;
      is_verified: boolean;
    };
    engagement: {
      likes_count: number;
      comments_count: number;
    };
    tagged_users: Array<{
      full_name: string;
      username: string;
      is_verified: boolean;
    }>;
    coauthors: Array<{
      full_name: string;
      username: string;
      is_verified: boolean;
    }>;
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