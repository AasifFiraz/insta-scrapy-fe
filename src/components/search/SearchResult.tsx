import React, { useState, useEffect } from 'react';
import { BookmarkPlus, Bookmark } from 'lucide-react';
import { useSavedProfilesContext } from '../../context/SavedProfilesContext';
import { convertImageToBase64 } from '../../services/postsService';

interface SearchResultProps {
  username: string;
  fullName: string;
  profilePic: string;
  isSelected?: boolean;
  onSelect: () => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  username,
  fullName,
  profilePic,
  isSelected,
  onSelect
}) => {
  const { isProfileSaved, saveProfile, unsaveProfile } = useSavedProfilesContext();
  const isSaved = isProfileSaved(username);
  const [profilePicBase64, setProfilePicBase64] = useState<string>(profilePic);

  const handleClick = () => {
    onSelect()
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking save
    if (isSaved) {
      unsaveProfile(username);
    } else {
      saveProfile(username);
    }
  };

  // Convert profile picture to base64 if needed
  useEffect(() => {
    if (profilePic) {
      const loadProfilePic = async () => {
        try {
          const base64Image = await convertImageToBase64(profilePic);
          setProfilePicBase64(base64Image);
        } catch (error) {
          console.error('Error converting profile picture to base64:', error);
          // Fallback to original URL if conversion fails
          setProfilePicBase64(profilePic);
        }
      };

      loadProfilePic();
    }
  }, [profilePic]);
  return (
    <div
      onClick={handleClick}
      className={`relative w-full p-2 rounded-lg flex items-center justify-between group cursor-pointer transition-all ${
        isSelected ? 'bg-gray-50' : 'hover:bg-gray-50'
      }`}
    >
      {/* Magical hover/selected effect */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-200 pointer-events-none ${
        isSelected
          ? 'opacity-100'
          : 'opacity-0 group-hover:opacity-100'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/[0.075] to-pink-500/[0.075] rounded-lg" />
        <div className="absolute inset-0 rounded-lg border border-purple-500/10 shadow-[0_2px_8px_rgba(168,85,247,0.05)]" />
      </div>

      <div className="flex items-center gap-3 relative">
        <img
          src={profilePicBase64}
          alt={fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900">{fullName}</span>
            <span className="text-gray-500">@{username}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`p-2 rounded-lg transition-colors relative ${
          isSaved
            ? 'text-purple-500 bg-purple-500/10'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
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
