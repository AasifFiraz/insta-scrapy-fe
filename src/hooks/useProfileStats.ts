import { useEffect, useState } from 'react';
import { TimeRange } from '../types/metrics';
import { fetchMetricsData } from '../services/metricsService';
import { fetchProfilePosts } from '../services/postsService';

interface ProfileStats {
  followers: number;
  posts: number;
  likes: number;
  comments: number;
  followerChange: number;
  postChange: number;
  likeChange: number;
  commentChange: number;
}

const getTimeRangeDays = (timeRange: TimeRange): number => {
  switch (timeRange) {
    case '7D': return 7;
    case '28D': return 28;
    case '90D': return 90;
    default: return 28;
  }
};

export const useProfileStats = (handle: string, timeRange: TimeRange): ProfileStats => {
  const [stats, setStats] = useState<ProfileStats>({
    followers: 0,
    posts: 0,
    likes: 0,
    comments: 0,
    followerChange: 0,
    postChange: 0,
    likeChange: 0,
    commentChange: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      const [metricsResponse, postsResponse] = await Promise.all([
        fetchMetricsData(handle, 'followers', timeRange),
        fetchProfilePosts(handle)
      ]);

      if (metricsResponse.data && postsResponse.data) {
        const followerData = metricsResponse.data;
        const allPosts = postsResponse.data;
        
        // Filter posts within the time range
        const daysAgo = getTimeRangeDays(timeRange);
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
        
        const posts = allPosts.filter(post => 
          new Date(post.createdAt) >= cutoffDate
        );
        
        const previousPosts = allPosts.filter(post => {
          const postDate = new Date(post.createdAt);
          return postDate >= new Date(cutoffDate.getTime() - daysAgo * 24 * 60 * 60 * 1000) &&
                 postDate < cutoffDate;
        });

        // Calculate total engagement for current period
        const totalLikes = posts.reduce((sum, post) => sum + post.stats.likes, 0);
        const totalComments = posts.reduce((sum, post) => sum + post.stats.comments, 0);
        
        // Calculate total engagement for previous period
        const previousLikes = previousPosts.reduce((sum, post) => sum + post.stats.likes, 0);
        const previousComments = previousPosts.reduce((sum, post) => sum + post.stats.comments, 0);
        
        // Calculate changes
        const currentFollowers = followerData[followerData.length - 1]?.value || 0;
        const previousFollowers = followerData[0]?.value || 0;
        const followerChange = currentFollowers - previousFollowers;

        setStats({
          followers: currentFollowers,
          posts: posts.length,
          likes: totalLikes,
          comments: totalComments,
          followerChange,
          postChange: posts.length - previousPosts.length,
          likeChange: totalLikes - previousLikes,
          commentChange: totalComments - previousComments
        });
      }
    };

    loadStats();
  }, [handle, timeRange]);

  return stats;
};