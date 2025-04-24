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
    post_link: string;
  }>;
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  total: number;
}

interface GenerateCaptionResponse {
  structured_caption: string;
}

interface ProcessMediaResponse {
  extracted_text: string;
  success: boolean;
}

/**
 * Checks if a string is already a base64 image
 * @param url The URL or string to check
 * @returns True if the string is already a base64 image
 */
export const isBase64Image = (url: string): boolean => {
  return url?.startsWith('data:image');
};

/**
 * Converts an image URL to base64 if it's not already in base64 format
 * @param imageUrl The image URL to convert
 * @returns The base64 string or original URL if conversion fails
 */
export const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  // If the image is already a base64 string, return it as is
  if (isBase64Image(imageUrl)) {
    return imageUrl;
  }

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

export const processPostMedia = async (mediaUrls: Array<{ type: string; url: string }>): Promise<string> => {
  try {
    const response = await axiosInstance.post<ProcessMediaResponse>('/process-media', {
      media_urls: mediaUrls
    });
    return response.data.extracted_text;
  } catch (error) {
    console.error('Error processing media:', error);
    throw error;
  }
};

export const getPosts = async (
  handle: string,
  days: number = 7,
  type?: 'image' | 'reel' | 'carousel',
  page: number = 1,
  onPostReady?: (post: Post) => void
): Promise<{ posts: Post[]; pagination: PostsResponse['pagination'] }> => {
  try {
    const response = await axiosInstance.get<PostsResponse>(`/profile/${handle}/posts`, {
      params: {
        days,
        type,
        page
      }
    });

    // Create an array to store all post promises
    const postPromises = response.data.posts.map(async post => {
      try {
        // Convert the image first
        // const base64Image = await convertImageToBase64(post.thumbnail_image);

        // Create the post object only after image conversion
        const readyPost: Post = {
          id: post.id,
          thumbnail: post.thumbnail_image,
          caption: post.title,
          post_link: post.post_link,
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
          context: post.context,
          media: post.media_url
        };

        // Notify about the ready post
        onPostReady?.(readyPost);
        return readyPost;
      } catch (error) {
        console.error('Error preparing post:', error);
        return null;
      }
    });

    // Wait for all posts and filter out failed ones
    const completedPosts = (await Promise.all(postPromises)).filter((post): post is Post => post !== null);
    return { posts: completedPosts, pagination: response.data.pagination };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], pagination: { page: 1, page_size: 5, total: 0, total_pages: 0 } };
  }
};