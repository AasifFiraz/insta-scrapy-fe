import { TimeRange, DataPoint } from './types';

export const generateMockData = (timeRange: TimeRange): DataPoint[] => {
  const points = {
    '7D': 7,
    '28D': 28,
    '3M': 90,
    '1Y': 365,
    'Max': 365,
  }[timeRange];

  return Array.from({ length: points }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (points - i - 1));

    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.random() * 1000000 + 500000,
      posts: Math.random() > 0.7 ? [
        {
          id: `post-${i}-1`,
          thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&h=400',
          title: 'How to Scale Your Business',
          views: '24.5K',
          likes: '1.2K',
          timestamp: '2h ago'
        },
        {
          id: `post-${i}-2`,
          thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?auto=format&fit=crop&w=400&h=400',
          title: 'Marketing Strategies That Work',
          views: '18.3K',
          likes: '956',
          timestamp: '4h ago'
        },
        {
          id: `post-${i}-3`,
          thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=400&h=400',
          title: '5 Tips for Success',
          views: '12.1K',
          likes: '734',
          timestamp: '6h ago'
        }
      ] : undefined
    };
  });
};