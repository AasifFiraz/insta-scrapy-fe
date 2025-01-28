import { SavedAnalyticsData } from '../types/save';
import { addDays, format } from 'date-fns';

export const getHormoziAnalytics = (): SavedAnalyticsData => {
  // Generate 365 days of data starting from today
  const growthData = Array.from({ length: 365 }, (_, i) => {
    const date = addDays(new Date(), -364 + i);
    
    // Generate follower growth with realistic patterns
    const baseFollowers = 2500000 + (i * 2000); // Start at 2.5M, grow by ~2K per day
    const dailyVariation = 0.9 + (Math.random() * 0.2); // ±10% daily variation
    const followers = Math.round(baseFollowers * dailyVariation);
    
    // Generate engagement based on follower count
    const baseEngagement = followers * 0.06; // 6% base engagement rate
    const engagementVariation = 0.8 + (Math.random() * 0.4); // ±20% variation
    const engagement = Math.round(baseEngagement * engagementVariation);

    return {
      date: format(date, 'yyyy-MM-dd'), // Use ISO format for dates
      followers,
      engagement
    };
  });

  const lastDay = growthData[growthData.length - 1];
  const firstDay = growthData[0];
  const followerGrowth = lastDay.followers - firstDay.followers;
  const totalPosts = Math.round(365 * 0.7); // Average 0.7 posts per day

  return {
    totalFollowers: lastDay.followers,
    followerGrowth,
    totalPosts,
    totalLikes: Math.round(lastDay.followers * 0.4), // 40% of followers have liked
    totalComments: Math.round(lastDay.followers * 0.05), // 5% of followers have commented
    averageEngagement: Math.round(
      growthData.reduce((sum, day) => sum + day.engagement, 0) / growthData.length
    ),
    postTypes: [
      {
        type: 'image',
        count: Math.round(totalPosts * 0.4),
        engagement: 150000,
        followers: Math.round(followerGrowth * 0.4),
        efficiency: 0.8
      },
      {
        type: 'carousel',
        count: Math.round(totalPosts * 0.35),
        engagement: 180000,
        followers: Math.round(followerGrowth * 0.35),
        efficiency: 0.9
      },
      {
        type: 'reel',
        count: Math.round(totalPosts * 0.25),
        engagement: 220000,
        followers: Math.round(followerGrowth * 0.25),
        efficiency: 1.1
      }
    ],
    postAngles: [
      {
        type: 'Business Growth',
        count: Math.round(totalPosts * 0.4),
        engagement: 190000,
        examples: []
      },
      {
        type: 'Marketing',
        count: Math.round(totalPosts * 0.3),
        engagement: 170000,
        examples: []
      },
      {
        type: 'Mindset',
        count: Math.round(totalPosts * 0.3),
        engagement: 160000,
        examples: []
      }
    ],
    growthData
  };
};