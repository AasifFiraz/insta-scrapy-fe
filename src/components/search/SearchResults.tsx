import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { ProfileCard } from './ProfileCard';
import { DETAILED_PROFILES } from '../../data/mockProfiles';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

  const handleSelect = (handle: string) => {
    navigate(`/profile/${handle}`);
  };

  const { selectedIndex, handleKeyDown } = useKeyboardNavigation({
    items: DETAILED_PROFILES,
    onSelect: (profile) => handleSelect(profile.handle),
    isOpen: true
  });

  // Add keyboard event listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        setIsUsingKeyboard(true);
      }
      handleKeyDown(e as any);
    };

    const handleMouseMove = () => {
      setIsUsingKeyboard(false);
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleKeyDown]);

  return (
    <div 
      className="min-h-screen bg-black pt-24 px-4"
      tabIndex={0}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-white text-xl font-semibold">
            Top Profiles for "{query}"
          </h1>
          <div className="flex gap-2">
            <button className="bg-white/10 hover:bg-white/15 text-white px-4 py-1.5 rounded-lg text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <select className="bg-white/10 hover:bg-white/15 text-white px-4 py-1.5 rounded-lg text-sm appearance-none cursor-pointer">
              <option>Relevance</option>
              <option>Followers</option>
              <option>Posts</option>
              <option>Likes</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          {DETAILED_PROFILES.map((profile, index) => (
            <ProfileCard 
              key={profile.id} 
              {...profile}
              isSelected={isUsingKeyboard && index === selectedIndex}
              onSelect={() => handleSelect(profile.handle)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};