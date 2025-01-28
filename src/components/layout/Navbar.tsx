import React, { useState, useRef } from 'react';
import { Menu, X, Folder } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { MoreToolsDropdown } from './MoreToolsDropdown';
import { FreeToolsDropdown } from './FreeToolsDropdown';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ProBadge } from '../common/ProBadge';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tabletMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useClickOutside(tabletMenuRef, () => setIsMenuOpen(false), isMenuOpen);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-black/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Logo />
              <div className="hidden md:flex items-center gap-4">
                <FreeToolsDropdown />
                <Link 
                  to="/swipefile"
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white"
                >
                  <Folder className="w-4 h-4" />
                  <span>Swipefile</span>
                  <ProBadge />
                </Link>
                <MoreToolsDropdown />
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <button className="text-white/80 hover:text-white">Log in</button>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-1.5 rounded-lg text-sm">
                Sign Up
              </button>
            </div>

            {/* Mobile/Tablet menu button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center gap-2 text-white/80 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tablet menu dropdown */}
        {isMenuOpen && (
          <div 
            ref={tabletMenuRef}
            className="md:hidden border-t border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/editor"
                className="block w-full text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  Free Tools
                </span>
              </Link>
              <button 
                onClick={() => handleNavigation('/swipefile')}
                className="w-full text-left"
              >
                <span className="block w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  Swipefile
                  <ProBadge />
                </span>
              </button>
              <button className="w-full text-left">
                <span className="block w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  Coming Soon
                  <ProBadge />
                </span>
              </button>
              <div className="pt-4 border-t border-white/10">
                <button className="block w-full text-left text-white/80 hover:text-white px-4 py-2">
                  Log in
                </button>
                <button className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm mt-3">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu button - only visible on phones */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden fixed right-4 bottom-4 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2.5 rounded-lg shadow-lg"
      >
        {isMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile menu overlay - only visible on phones */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Bottom sheet menu */}
          <div 
            className="sm:hidden fixed inset-x-0 bottom-0 bg-black border-t border-white/10 rounded-t-lg z-50"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 space-y-3">
              <Link 
                to="/editor"
                className="w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="block w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  Free Tools
                </span>
              </Link>
              <button 
                onClick={() => handleNavigation('/swipefile')}
                className="w-full"
              >
                <span className="block w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  Swipefile
                  <ProBadge />
                </span>
              </button>
              <button className="w-full">
                <span className="block w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                  Coming Soon
                  <ProBadge />
                </span>
              </button>
              <div className="pt-3 border-t border-white/10">
                <button className="block w-full text-left text-white/80 hover:text-white px-4 py-2">
                  Log in
                </button>
                <button className="block w-full text-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm mt-3">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};