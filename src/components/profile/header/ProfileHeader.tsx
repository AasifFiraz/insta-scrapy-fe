import React from 'react';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileInfo } from './ProfileInfo';
import { ProfileTabs } from './ProfileTabs';
import { SaveProfileButton } from '../../common/SaveProfileButton';
import { UseProfileAnalyticsResult } from '../../../hooks/useProfileAnalytics';
import { UserX } from 'lucide-react';

interface ProfileHeaderProps {
  handle: string;
  analytics: UseProfileAnalyticsResult;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ handle, analytics }) => {
  const { profileData, isLoading, error } = analytics;

  if (error?.includes('Profile fetch failed') || analytics?.error?.includes('NOT FOUND')) {
    return (
      <div className="min-h-screen bg-black pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 rounded-xl p-8 text-center">
            <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">Profile Not Found</h2>
            <p className="text-gray-400">
              The profile @{handle} could not be found. Please check the username and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading || !profileData) {
    return (
      <div className="bg-white/5 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col items-center sm:items-stretch sm:flex-row sm:gap-6 animate-pulse">
          {/* Avatar skeleton */}
          <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
            <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-xl bg-white/10" />
          </div>

          {/* Info skeleton */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              <div className="h-8 bg-white/10 rounded w-48" />
              <div className="h-4 bg-white/10 rounded w-32" />
              <div className="h-4 bg-white/10 rounded w-64" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const profile = {
    id: 1,
    avatar: profileData.profilePic,
    name: profileData.fullName,
    handle: profileData.username,
    subscribers: profileData.followers || 0,
    videos: profileData.posts || 0,
    views: '0', // This could be calculated from actual data if available
    description: profileData.biography
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 sm:p-6">
      <div className="flex flex-col items-center sm:items-stretch sm:flex-row sm:gap-6">
        {/* Avatar */}
        <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
          <ProfileAvatar 
            src={profile.avatar} 
            alt={profile.name}
            size="lg"
          />
        </div>

        {/* Profile Info and Save Button */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <ProfileInfo profile={profile} />
            <div className="flex justify-center sm:justify-start shrink-0">
              <SaveProfileButton handle={handle} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 sm:mt-6">
        <ProfileTabs handle={handle} />
      </div>
    </div>
  );
};
