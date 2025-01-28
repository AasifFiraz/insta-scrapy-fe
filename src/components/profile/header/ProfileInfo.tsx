import React from 'react';
import { formatNumber } from '../../../utils/numberFormat';

interface ProfileInfoProps {
  profile: {
    name: string;
    handle: string;
    subscribers: string;
    videos: string;
    views: string;
    description: string;
  };
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  return (
    <div className="flex flex-col items-center sm:items-start">
      {/* Name and Handle */}
      <div className="mb-2 sm:mb-1 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          {profile.name}
        </h1>
        <span className="text-sm sm:text-base text-gray-400">
          @{profile.handle}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-white font-medium">{formatNumber(parseInt(profile.subscribers))}</span>
          <span className="text-gray-400 text-sm">followers</span>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-white font-medium">{formatNumber(parseInt(profile.videos))}</span>
          <span className="text-gray-400 text-sm">posts</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-400 text-sm sm:text-base text-center sm:text-left">
        {profile.description}
      </p>
    </div>
  );
};
