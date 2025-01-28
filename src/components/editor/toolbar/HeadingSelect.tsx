import React, { useState, useRef } from 'react';
import { Type, ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { HeadingType } from '../type';

interface HeadingSelectProps {
  onChange: (type: HeadingType) => void;
}

export const HeadingSelect: React.FC<HeadingSelectProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const headings = [
    { type: 'p' as HeadingType, label: 'Normal Text', style: 'text-base' },
    { type: 'h1' as HeadingType, label: 'Heading 1', style: 'text-2xl font-bold' },
    { type: 'h2' as HeadingType, label: 'Heading 2', style: 'text-xl font-bold' },
    { type: 'h3' as HeadingType, label: 'Heading 3', style: 'text-lg font-bold' },
    { type: 'h4' as HeadingType, label: 'Heading 4', style: 'text-base font-bold' },
    { type: 'h5' as HeadingType, label: 'Heading 5', style: 'text-sm font-bold' },
    { type: 'h6' as HeadingType, label: 'Heading 6', style: 'text-xs font-bold' }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
      >
        <Type className="w-4 h-4" />
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-40 bg-black border border-white/10 rounded-lg shadow-xl z-10">
          {headings.map(({ type, label, style }) => (
            <button
              key={type}
              onClick={() => {
                onChange(type);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left hover:bg-white/5 text-gray-400 hover:text-white ${style}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
