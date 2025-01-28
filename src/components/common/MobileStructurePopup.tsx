import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface MobileStructurePopupProps {
  text: string;
  onClose: () => void;
}

export const MobileStructurePopup: React.FC<MobileStructurePopupProps> = ({ text, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copied, onClose]);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div 
        className="fixed inset-x-0 bottom-0 bg-black border-t border-white/10 rounded-t-xl p-4 z-50 max-h-[80vh] overflow-y-auto"
        onClick={handleClick}
      >
        {copied ? (
          <div className="flex items-center justify-center gap-2 text-emerald-500 py-8">
            <Check className="w-5 h-5" />
            <span>Copied to clipboard!</span>
          </div>
        ) : (
          <>
            <p className="text-gray-400 text-sm text-center mb-4">Tap anywhere to copy</p>
            <div className="text-white whitespace-pre-wrap">{text}</div>
          </>
        )}
      </div>
    </>
  );
};