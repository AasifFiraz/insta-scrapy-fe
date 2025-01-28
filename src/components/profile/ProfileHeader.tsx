import React from 'react';
import { ProfileDetailedInfo } from '../../types/profile';

interface ProfileHeaderProps {
  profile: ProfileDetailedInfo;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile }) => {
  return (
    <div className="bg-white/5 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-6">
        <img src={profile.avatar} alt={profile.name} className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            {profile.name}
            <span className="text-gray-400 text-base font-normal">@{profile.handle}</span>
          </h1>
          <p className="text-gray-400 mt-2">{profile.description}</p>
        </div>
      </div>
    </div>
  );
};