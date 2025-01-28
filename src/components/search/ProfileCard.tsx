import React from 'react';
import { BookmarkPlus, Bookmark } from 'lucide-react';
import { ProfileDetailedInfo } from '../../types/profile';
import { useSavedProfilesContext } from '../../context/SavedProfilesContext';

interface ProfileCardProps extends ProfileDetailedInfo {
  isSelected?: boolean;
  onSelect: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = (profile) => {
  const { 
    isSelected,
    onSelect,
    ...profileData
  } = profile;
  
  const { isProfileSaved, saveProfile, unsaveProfile } = useSavedProfilesContext();
  const isSaved = isProfileSaved(profileData.handle);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking save
    if (isSaved) {
      unsaveProfile(profileData.handle);
    } else {
      saveProfile(profileData.handle);
    }
  };

  return (
    <div 
      onClick={onSelect}
      className={`relative bg-white/5 rounded-lg p-4 flex items-center justify-between group cursor-pointer transition-all ${
        isSelected ? 'bg-white/10' : 'hover:bg-white/10'
      }`}
    >
      {/* Magical hover/selected effect */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-200 pointer-events-none ${
        isSelected
          ? 'opacity-100'
          : 'opacity-0 group-hover:opacity-100'
      }`}>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.075] to-pink-500/[0.075] rounded-lg" />
        {/* Subtle border glow */}
        <div className="absolute inset-0 rounded-lg border border-purple-500/10 shadow-[0_2px_8px_rgba(168,85,247,0.05)]" />
      </div>

      <div className="flex items-center gap-4 relative">
        <img src={profileData.avatar} alt={profileData.name} className="w-12 h-12 rounded-full" />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium">{profileData.name}</h3>
            <span className="text-gray-400">@{profileData.handle}</span>
          </div>
          <div className="text-gray-400 text-sm flex items-center gap-4">
            <span>{profileData.subscribers} followers</span>
            <span>•</span>
            <span>{profileData.videos} posts</span>
            <span>•</span>
            <span>{profileData.views} likes</span>
          </div>
          <p className="text-gray-400 text-sm mt-1">{profileData.description}</p>
        </div>
      </div>
      <button 
        onClick={handleSave}
        className={`p-2 rounded-lg transition-colors relative ${
          isSaved 
            ? 'text-purple-500 bg-purple-500/10' 
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        {isSaved ? (
          <Bookmark className="w-5 h-5 fill-current" />
        ) : (
          <BookmarkPlus className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};