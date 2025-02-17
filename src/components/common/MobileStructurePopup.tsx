import React from 'react';
import { Check } from 'lucide-react';

interface MobileStructurePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onCopy: () => void;
  copied: boolean;
}

export const MobileStructurePopup: React.FC<MobileStructurePopupProps> = ({ 
  isOpen,
  onClose,
  title,
  content,
  onCopy,
  copied
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-black border border-white/10 rounded-xl p-4 z-50 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onCopy}
            className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            {copied ? (
              <div className="flex items-center gap-2 text-emerald-500">
                <Check className="w-4 h-4" />
                <span className="text-sm">Copied!</span>
              </div>
            ) : (
              <span className="text-sm">Copy</span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="text-white whitespace-pre-wrap">{content}</div>
      </div>
    </>
  );
};