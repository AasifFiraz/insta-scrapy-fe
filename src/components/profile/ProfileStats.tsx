import React from 'react';
import { ProfileDetailedInfo } from '../../types/profile';

interface ProfileStatsProps {
  profile: ProfileDetailedInfo;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatCard label="Total Views" value={profile.views} />
      <StatCard label="Subscribers" value={profile.subscribers} />
      <StatCard label="Videos" value={profile.videos} />
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white/5 rounded-xl p-6">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-gray-400 text-sm">{label}</div>
  </div>
);