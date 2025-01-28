import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export type SortOption = 'recent' | 'likes' | 'comments';

interface PostsSortingProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export const PostsSorting: React.FC<PostsSortingProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  const options: { value: SortOption; label: string }[] = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'likes', label: 'Most Liked' },
    { value: 'comments', label: 'Most Comments' }
  ];

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentOption = options.find(opt => opt.value === value)?.label;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 hover:bg-white/15 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 min-w-[140px] justify-between"
      >
        <span>{currentOption}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 bg-black border border-white/10 rounded-lg shadow-xl py-1 z-10"
          style={{ width: buttonWidth }}
        >
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-sm text-left transition-colors ${
                value === option.value
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};