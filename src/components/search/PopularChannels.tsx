import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SUGGESTED_PROFILES } from '../../data/mockProfiles';

export const PopularChannels: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-12">
      <h2 className="text-white/80 text-sm mb-4">Popular Profiles</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {SUGGESTED_PROFILES.slice(0, 4).map((profile) => (
          <button
            key={profile.id}
            onClick={() => navigate(`/profile/${profile.handle}`)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 rounded-full px-4 py-2 transition-colors"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-white text-sm">{profile.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};