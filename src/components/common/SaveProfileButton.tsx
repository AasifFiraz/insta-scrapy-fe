import React from 'react';
import { BookmarkPlus, Bookmark } from 'lucide-react';
import { useSavedProfilesContext } from '../../context/SavedProfilesContext';

interface SaveProfileButtonProps {
  handle: string;
}

export const SaveProfileButton: React.FC<SaveProfileButtonProps> = ({ handle }) => {
  const { isProfileSaved, saveProfile, unsaveProfile } = useSavedProfilesContext();
  const isSaved = isProfileSaved(handle);

  const handleClick = () => {
    if (isSaved) {
      unsaveProfile(handle);
    } else {
      saveProfile(handle);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isSaved
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
      title={isSaved ? 'Unsave Profile' : 'Save Profile'}
    >
      {isSaved ? (
        <Bookmark className="w-4 h-4 fill-current" />
      ) : (
        <BookmarkPlus className="w-4 h-4" />
      )}
      <span className="hidden lg:inline">
        {isSaved ? 'Saved' : 'Save'}
      </span>
    </button>
  );
};