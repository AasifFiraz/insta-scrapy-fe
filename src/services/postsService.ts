import axios from 'axios';
import { Post } from '../types/post';

interface PostsResponse {
  filters: {
    days: number;
    type: string | null;
  };
  posts: Array<{
    angle: string;
    caption_structure: string;
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
  }>;
  total: number;
}

// Get the base URL from environment variables or use default values
const baseURL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://postlyze.com' : 'http://localhost:5000');

// Create an axios instance with the base URL
const api = axios.create({
  baseURL
});

const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await api.get('/api/proxy/image', {
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

export const getPosts = async (
  handle: string,
  days: number = 7,
  type?: 'image' | 'reel' | 'carousel'
): Promise<Post[]> => {
  try {
    const response = await api.get<PostsResponse>(`/api/profile/${handle}/posts`, {
      params: {
        days,
        type
      }
    });

    const postsWithBase64 = await Promise.all(response.data.posts.map(async post => ({
      id: post.id,
      thumbnail: await convertImageToBase64(post.thumbnail_image),
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
        captionStructure: post.caption_structure
      }
    })));

    return postsWithBase64;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};