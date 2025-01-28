import { Post } from '../../types/post';
import { v4 as uuidv4 } from 'uuid';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1611162616305-c69b3037c7bb',
  'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113'
].map(url => `${url}?auto=format&fit=crop&w=600&h=600`);

const SAMPLE_REELS = [
  'https://images.unsplash.com/photo-1517841905240-472988babdf9',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
].map(url => `${url}?auto=format&fit=crop&w=600&h=1067`);

const SAMPLE_CAPTIONS = [
  'How to scale your business in 2024 🚀',
  'The ONE thing holding you back from success',
  '3 marketing strategies that actually work',
  'Building a 7-figure business from scratch',
  'Why most entrepreneurs fail (and how to avoid it)',
  'The mindset shift that changed everything',
  'Stop doing these 3 things immediately',
  'The truth about passive income',
  'My morning routine for peak performance'
];

export const generateMockPosts = (handle: string): Post[] => {
  const posts: Post[] = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < 48; i++) {
    const type = i % 4 === 0 ? 'reel' : i % 4 === 1 ? 'carousel' : 'image';
    
    // Generate a unique ID using UUID
    let id = `${handle}-${uuidv4()}`;
    while (usedIds.has(id)) {
      id = `${handle}-${uuidv4()}`;
    }
    usedIds.add(id);

    posts.push({
      id,
      thumbnail: type === 'reel' ? SAMPLE_REELS[i % SAMPLE_REELS.length] : SAMPLE_IMAGES[i % SAMPLE_IMAGES.length],
      caption: SAMPLE_CAPTIONS[i % SAMPLE_CAPTIONS.length],
      type,
      stats: {
        likes: Math.floor(Math.random() * 50000) + 10000,
        comments: Math.floor(Math.random() * 1000) + 100
      },
      createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return posts;
};