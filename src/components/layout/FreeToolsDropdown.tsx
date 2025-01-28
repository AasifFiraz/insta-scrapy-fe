import React, { useState, useRef } from 'react';
import { ChevronDown, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../hooks/useClickOutside';

export const FreeToolsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-400 hover:text-white"
      >
        Free Tools
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-xl z-50">
          <Link
            to="/editor"
            className="flex items-center gap-2 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5"
          >
            <Edit className="w-4 h-4" />
            <span>Editor</span>
          </Link>
        </div>
      )}
    </div>
  );
};