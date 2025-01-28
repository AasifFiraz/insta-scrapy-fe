import { useMemo } from 'react';
import { Users, Image, Heart, MessageCircle } from 'lucide-react';
import { formatNumber } from '../../../utils/numberFormat';
import { ProfileMetric } from './types';

interface MetricsInput {
  followers: number;
  followerChange: number;
  posts: number;
  postChange: number;
  likes: number;
  likeChange: number;
  comments: number;
  commentChange: number;
}

export const useProfileMetrics = ({
  followers,
  followerChange,
  posts,
  postChange,
  likes,
  likeChange,
  comments,
  commentChange
}: MetricsInput): ProfileMetric[] => {
  return useMemo(() => [
    {
      label: "Total Followers",
      value: formatNumber(followers),
      change: `${followerChange >= 0 ? '+' : ''}${formatNumber(followerChange)}`,
      icon: Users
    },
    {
      label: "Total Posts",
      value: formatNumber(posts),
      change: `${postChange >= 0 ? '+' : ''}${formatNumber(postChange)}`,
      icon: Image
    },
    {
      label: "Total Likes",
      value: formatNumber(likes),
      change: `${likeChange >= 0 ? '+' : ''}${formatNumber(likeChange)}`,
      icon: Heart
    },
    {
      label: "Total Comments",
      value: formatNumber(comments),
      change: `${commentChange >= 0 ? '+' : ''}${formatNumber(commentChange)}`,
      icon: MessageCircle
    }
  ], [followers, followerChange, posts, postChange, likes, likeChange, comments, commentChange]);
};