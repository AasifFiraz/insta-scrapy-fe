import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { ProfileDetailedInfo } from '../../types/profile';

export const ProfileCard: React.FC<ProfileDetailedInfo> = (profile) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/5 hover:bg-white/10 rounded-lg p-4 flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <img src={profile.avatar} alt={profile.name} className="w-12 h-12 rounded-full" />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{profile.name}</h3>
            <span className="text-gray-400">@{profile.handle}</span>
          </div>
          <div className="text-gray-400 text-sm flex items-center gap-4">
            <span>{profile.subscribers} subscribers</span>
            <span>•</span>
            <span>{profile.videos} videos</span>
            <span>•</span>
            <span>{profile.views} views</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">{profile.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate(`/profile/${profile.handle}`)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-1.5 rounded-lg text-sm"
        >
          Go to Profile
        </button>
        <button className="text-gray-400 hover:text-white">
          <Star className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};