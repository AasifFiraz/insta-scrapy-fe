import axiosInstance from '../utils/axios';
import { Post } from '../types/post';

interface PostsResponse {
  filters: {
    days: number;
    type: string | null;
  };
  posts: Array<{
    angle: string;
    caption_text: string;
    comments_count: number;
    date_posted: string;
    goal: string;
    id: string;
    likes_count: number;
    media_url: Array<{
      type: string;
      url: string;
    }>;
    post_copy: string;
    post_structure: string;
    post_type: string;
    thumbnail_image: string;
    title: string;
    topic: string;
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
  }>;
  total: number;
}

interface GenerateCaptionResponse {
  structured_caption: string;
}

const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await axiosInstance.get('/proxy/image', {
      params: {
        url: imageUrl
      }
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    return imageUrl; // Return original URL if conversion fails
  }
};

export const generateCaptionStructure = async (
  caption_text: string,
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
  }
): Promise<string> => {
  try {
    const response = await axiosInstance.post<GenerateCaptionResponse>('/generate-caption', {
      caption_text,
      context
    });
    return response.data.structured_caption;
  } catch (error) {
    console.error('Error generating caption structure:', error);
    throw error;
  }
};

export const getPosts = async (
  handle: string,
  days: number = 7,
  type?: 'image' | 'reel' | 'carousel',
  onPostReady?: (post: Post) => void
): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<PostsResponse>(`/profile/${handle}/posts`, {
      params: {
        days,
        type
      }
    });

    // Create an array to store all post promises
    const postPromises = response.data.posts.map(async post => {
      try {
        // Convert the image first
        const base64Image = await convertImageToBase64(post.thumbnail_image);
        
        // Create the post object only after image conversion
        const readyPost: Post = {
          id: post.id,
          thumbnail: base64Image,
          caption: post.title,
          type: post.post_type as 'image' | 'reel' | 'carousel',
          stats: {
            likes: post.likes_count,
            comments: post.comments_count
          },
          createdAt: post.date_posted,
          topic: post.topic,
          goal: post.goal,
          angle: post.angle,
          copy: {
            post: post.post_copy,
            caption: post.caption_text,
            postStructure: post.post_structure,
            captionStructure: ''
          },
          context: post.context
        };

        // Notify about the ready post
        onPostReady?.(readyPost);
        return readyPost;
      } catch (error) {
        console.error('Error preparing post:', error);
        // Skip this post if image conversion fails
        return null;
      }
    });

    // Wait for all posts and filter out failed ones
    const completedPosts = (await Promise.all(postPromises)).filter((post): post is Post => post !== null);
    return completedPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};