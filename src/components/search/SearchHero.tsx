import React, { useState, KeyboardEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { PopularChannels } from './PopularChannels';
import { SearchDropdown } from './SearchDropdown';
import { useClickOutside } from '../../hooks/useClickOutside';
import { SUGGESTED_PROFILES } from '../../data/mockProfiles';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

export const SearchHero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSelect = (handle: string) => {
    navigate(`/profile/${handle}`);
  };

  const { selectedIndex, handleKeyDown } = useKeyboardNavigation({
    items: SUGGESTED_PROFILES,
    onSelect: (profile) => handleSelect(profile.handle),
    isOpen: isSearchFocused && searchQuery.length > 0
  });

  useClickOutside(searchContainerRef, () => setIsSearchFocused(false));

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery && selectedIndex === -1) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      handleKeyDown(e);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20 sm:pt-32 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-12">
          Search any{' '}
          <span className="inline">Instagram Profile</span>
        </h1>
        
        <div className="relative w-full max-w-xl mx-auto" ref={searchContainerRef}>
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Try searching 'Alex Hormozi'"
              className="w-full bg-white rounded-lg pl-9 sm:pl-12 pr-10 py-2.5 sm:py-3 text-sm sm:text-base text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {isSearchFocused && searchQuery && (
            <SearchDropdown 
              query={searchQuery} 
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
            />
          )}
        </div>

        <div className="mt-8 sm:mt-12">
          <PopularChannels />
        </div>
      </div>
    </div>
  );
};