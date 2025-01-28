import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  text, 
  maxLength = 30 
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useClickOutside(popupRef, () => setShowPopup(false));

  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate 
    ? `${text.slice(0, maxLength)}...` 
    : text;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPopup(true)}
        className="text-left hover:text-white transition-colors"
      >
        {displayText}
      </button>

      {showPopup && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setShowPopup(false)}
          />
          
          {/* Centered Popup */}
          <div 
            ref={popupRef}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-white/10 rounded-lg shadow-xl p-6 min-w-[300px] max-w-[500px] max-h-[80vh] overflow-y-auto z-50"
          >
            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              title={copied ? 'Copied!' : 'Copy to clipboard'}
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* Content */}
            <div className="text-white whitespace-pre-wrap pr-8">{text}</div>
          </div>
        </>
      )}
    </div>
  );
};