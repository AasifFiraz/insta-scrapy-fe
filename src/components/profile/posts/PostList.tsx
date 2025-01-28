import React from 'react';
import { Post } from '../../../types/post';
import { formatNumber } from '../../../utils/numberFormat';
import { formatDistanceToNow } from '../../../utils/dateFormat';
import { FileText, AlignLeft, Copy, Check, FileCode, MessageSquare } from 'lucide-react';
import { MobileStructurePopup } from '../../common/MobileStructurePopup';
import { useState } from 'react';
import { getPostStructure, getCaptionStructure, getPostCopy, getCaptionCopy } from '../../../utils/postTemplates';

interface PostListProps {
  posts: Post[];
}

interface PopupContent {
  type: 'post' | 'caption' | 'postStructure' | 'captionStructure';
  text: string;
  postType: string;
  title: string;
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [selectedContent, setSelectedContent] = useState<PopupContent | null>(null);
  const [mobilePopupText, setMobilePopupText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!selectedContent) return;
    
    try {
      await navigator.clipboard.writeText(selectedContent.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const showContent = (type: PopupContent['type'], postType: string) => {
    let text = '';
    let title = '';

    switch (type) {
      case 'post':
        text = getPostCopy(postType);
        title = 'Post Copy';
        break;
      case 'caption':
        text = getCaptionCopy(postType);
        title = 'Caption Copy';
        break;
      case 'postStructure':
        text = getPostStructure(postType);
        title = 'Post Structure';
        break;
      case 'captionStructure':
        text = getCaptionStructure(postType);
        title = 'Caption Structure';
        break;
    }
    
    setSelectedContent({ type, text, postType, title });
  };

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-white/10">
              <th className="pb-3 font-medium">Title</th>
              <th className="pb-3 font-medium">Posted</th>
              <th className="pb-3 font-medium">Topic</th>
              <th className="pb-3 font-medium">Goal</th>
              <th className="pb-3 font-medium">Angle</th>
              <th className="pb-3 font-medium text-center">Likes</th>
              <th className="pb-3 font-medium text-center">Comments</th>
              <th className="pb-3 font-medium text-center">Copy</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {posts.map(post => (
              <tr key={post.id} className="border-b border-white/5">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.thumbnail} 
                      alt={post.caption}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <span className="text-white line-clamp-2">{post.caption}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-300">
                  {formatDistanceToNow(new Date(post.createdAt))}
                </td>
                <td className="py-4 text-gray-300">
                  Business Growth
                </td>
                <td className="py-4 text-gray-300">
                  Engagement
                </td>
                <td className="py-4 text-gray-300">
                  How-to
                </td>
                <td className="py-4 text-center text-gray-300">
                  {formatNumber(post.stats.likes)}
                </td>
                <td className="py-4 text-center text-gray-300">
                  {formatNumber(post.stats.comments)}
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => showContent('post', post.type)}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      title="Post Copy"
                    >
                      <FileCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showContent('caption', post.type)}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      title="Caption Copy"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showContent('postStructure', post.type)}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      title="Post Structure"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showContent('captionStructure', post.type)}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      title="Caption Structure"
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="md:hidden space-y-2">
        {posts.map(post => (
          <div key={post.id} className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <img 
                src={post.thumbnail} 
                alt={post.caption}
                className="w-16 h-16 rounded object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm line-clamp-2 mb-1">{post.caption}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{formatNumber(post.stats.likes)} likes</span>
                  <span>•</span>
                  <span>{formatNumber(post.stats.comments)} comments</span>
                  <span>•</span>
                  <span>{formatDistanceToNow(new Date(post.createdAt))}</span>
                </div>
              </div>
            </div>

            {/* Metadata grid */}
            <div className="mt-2 grid grid-cols-3 gap-x-4 gap-y-1 text-xs">
              <div className="text-gray-400">Topic:</div>
              <div className="text-gray-400">Angle:</div>
              <div className="text-gray-400">Goal:</div>
              <div className="text-white">Business Growth</div>
              <div className="text-white">How-to</div>
              <div className="text-white">Engagement</div>
            </div>

            {/* Structure buttons */}
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setMobilePopupText(getPostStructure(post.type))}
                className="flex-1 flex items-center justify-center gap-1 text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-2 py-1.5 rounded transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Post Structure</span>
              </button>
              <button
                onClick={() => setMobilePopupText(getCaptionStructure(post.type))}
                className="flex-1 flex items-center justify-center gap-1 text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-2 py-1.5 rounded transition-colors"
              >
                <AlignLeft className="w-3.5 h-3.5" />
                <span>Caption Structure</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Content Popup */}
      {selectedContent && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setSelectedContent(null)}
          />
          
          {/* Centered Popup */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="relative bg-black border border-white/10 rounded-lg shadow-xl p-6 w-[800px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
              {/* Magical outline/glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl -z-10" />
              <div className="absolute inset-0 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(236,72,153,0.1)] -z-10" />
              
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {selectedContent.title}
                </h3>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  title={copied ? 'Copied!' : 'Copy to clipboard'}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {/* Content */}
              <div className="text-white whitespace-pre-wrap text-base leading-relaxed">
                {selectedContent.text}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Structure Popup */}
      {mobilePopupText && (
        <MobileStructurePopup 
          text={mobilePopupText}
          onClose={() => setMobilePopupText(null)}
        />
      )}
    </>
  );
};