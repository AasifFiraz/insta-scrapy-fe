import React from 'react';
import { Users, UserPlus, Image, Lock } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { formatNumber } from '../../../utils/numberFormat';

interface MetricsOverviewProps {
  followers: number;
  following: number;
  posts: number;
  isPrivate: boolean;
  followerChange?: number; // Add optional change props
  followingChange?: number;
  postsChange?: number;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  followers,
  following,
  posts,
  isPrivate,
  followerChange,
  followingChange,
  postsChange
}) => {
  const metrics = [
    {
      label: "Followers",
      value: formatNumber(followers),
      change: followerChange !== undefined ? 
        `${followerChange >= 0 ? '+' : ''}${formatNumber(followerChange)}` : 
        undefined,
      icon: Users
    },
    {
      label: "Following",
      value: formatNumber(following),
      change: followingChange !== undefined ? 
        `${followingChange >= 0 ? '+' : ''}${formatNumber(followingChange)}` : 
        undefined,
      icon: UserPlus
    },
    {
      label: "Posts",
      value: formatNumber(posts),
      change: postsChange !== undefined ? 
        `${postsChange >= 0 ? '+' : ''}${formatNumber(postsChange)}` : 
        undefined,
      icon: Image
    },
    {
      label: "Account Status",
      value: isPrivate ? "Private" : "Public",
      icon: Lock
    }
  ];

  return (
    <>
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </>
  );
};
