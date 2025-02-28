import React from 'react';
import { Check, Loader2 } from 'lucide-react';
import { FormattedContent } from './FormattedContent';

interface MobileStructurePopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  contentType: 'post' | 'caption' | 'postStructure' | 'captionStructure';
  onCopy: () => void;
  copied: boolean;
  isLoading?: boolean;
  media?: Array<{
    type: string;
    url: string;
  }>;
}

export const MobileStructurePopup: React.FC<MobileStructurePopupProps> = ({ 
  isOpen,
  onClose,
  title,
  content,
  contentType,
  onCopy,
  copied,
  isLoading = false,
  media
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
          {!isLoading && (
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
          )}
        </div>

        {/* Content */}
        <div className="text-white">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <>
              <FormattedContent content={content} contentType={contentType} />
              {media && media.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {media.map((item, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                      {item.type === 'image' ? (
                        <img 
                          src={item.url} 
                          alt={`Media ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : item.type === 'video' ? (
                        <video 
                          src={item.url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};