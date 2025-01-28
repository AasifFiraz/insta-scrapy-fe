import { GrowthResponse } from '../../types/growth';
import { getMockMetricsData } from '../metrics/mockMetricsService';
import { getMockPosts } from '../posts/mockPostsService';
import { TimeRange } from '../../types/metrics';

const getTimeRangeDays = (timeRange: TimeRange): number => {
  switch (timeRange) {
    case '7D': return 7;
    case '28D': return 28;
    case '90D': return 90;
    default: return 28;
  }
};

export const getMockGrowthData = async (handle: string, timeRange: TimeRange): Promise<GrowthResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get follower data and posts
  const [metricsResponse, postsResponse] = await Promise.all([
    getMockMetricsData(handle, 'followers', timeRange),
    getMockPosts(handle)
  ]);

  if (!metricsResponse.data || !postsResponse.data) {
    return { data: [], error: 'Failed to load data' };
  }

  const followerData = metricsResponse.data;
  const allPosts = postsResponse.data;
  const days = getTimeRangeDays(timeRange);

  return {
    data: followerData.map((point, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - i - 1));
      
      // Filter posts for this day
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const postsForDay = allPosts.filter(post => {
        const postDate = new Date(post.createdAt);
        return postDate >= dayStart && postDate <= dayEnd;
      });

      // Calculate follower change
      const previousValue = i > 0 ? followerData[i - 1].value : followerData[i].value;
      const followerChange = point.value - previousValue;

      return {
        date: date.toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric'
        }),
        followers: {
          total: point.value,
          change: followerChange
        },
        posts: {
          total: allPosts.filter(post => new Date(post.createdAt) <= dayEnd).length,
          new: postsForDay.map(post => new Date(post.createdAt).getTime())
        }
      };
    })
  };
};