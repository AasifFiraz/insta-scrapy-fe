import { DailyGrowth } from '../../types/growth';
import { GROWTH_PATTERNS } from './constants';
import { getOrGenerateMetricsData } from '../metrics/generators';

export const generateGrowthData = (days: number = 90): DailyGrowth[] => {
  const metricsData = getOrGenerateMetricsData();
  const followerData = metricsData.followers.slice(-days);
  
  return followerData.map((followers, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    
    const followerChange = i === 0 ? 0 : followers - followerData[i - 1];
    const newPosts = Math.random() > GROWTH_PATTERNS.POSTS.FREQUENCY ? [] :
      [Date.now()]; // Simplified post generation
    
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric'
      }),
      followers: {
        total: followers,
        change: followerChange
      },
      posts: {
        total: GROWTH_PATTERNS.POSTS.BASE + i,
        new: newPosts
      }
    };
  });
};