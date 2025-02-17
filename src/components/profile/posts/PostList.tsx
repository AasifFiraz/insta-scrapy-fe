import React, { useState } from 'react';
import { Post } from '../../../types/post';
import { formatNumber } from '../../../utils/numberFormat';
import { formatDistanceToNow } from '../../../utils/dateFormat';
import { FileText, AlignLeft, FileCode, MessageSquare } from 'lucide-react';
import { MobileStructurePopup } from '../../common/MobileStructurePopup';

interface PostListProps {
  posts: Post[];
}

type PopupContent = {
  type: 'post' | 'caption' | 'postStructure' | 'captionStructure';
  text: string;
  postType: string;
  title: string;
  copy?: {
    post: string;
    caption: string;
    postStructure: string;
    captionStructure: string;
  };
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [selectedContent, setSelectedContent] = useState<PopupContent | null>(null);
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

  const showContent = (type: PopupContent['type'], post: Post) => {
    let text = '';
    let title = '';

    switch (type) {
      case 'post':
        text = post.copy.post;
        title = 'Post Copy';
        break;
      case 'caption':
        text = post.copy.caption;
        title = 'Caption Copy';
        break;
      case 'postStructure':
        text = post.copy.postStructure;
        title = 'Post Structure';
        break;
      case 'captionStructure':
        text = post.copy.captionStructure;
        title = 'Caption Structure';
        break;
    }
    
    setSelectedContent({ type, text, postType: post.type, title });
  };

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 text-sm border-b border-white/10">
              <th className="pb-3 font-medium w-[300px]">Title</th>
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
                  {post.topic || '-'}
                </td>
                <td className="py-4 text-gray-300">
                  {post.goal || '-'}
                </td>
                <td className="py-4 text-gray-300">
                  {post.angle || '-'}
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
                      onClick={() => showContent('post', post)}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      title="Post Copy"
                    >
                      <FileCode className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showContent('caption', post)}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      title="Caption Copy"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showContent('postStructure', post)}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                      title="Post Structure"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showContent('captionStructure', post)}
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
      <div className="md:hidden space-y-4">
        {posts.map(post => (
          <div key={post.id} className="bg-white/5 rounded-lg p-3">
            <div className="flex gap-3">
              <img
                src={post.thumbnail}
                alt={post.caption}
                className="w-20 h-20 rounded object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm line-clamp-2 mb-2">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-gray-400 text-xs">
                    <span>{formatNumber(post.stats.likes)} likes</span>
                    <span>{formatNumber(post.stats.comments)} comments</span>
                  </div>
                  <span className="text-gray-400 text-xs">
                    {formatDistanceToNow(new Date(post.createdAt))}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-400">
                  {post.topic && <span>Topic: {post.topic}</span>}
                  {post.goal && <span>Goal: {post.goal}</span>}
                  {post.angle && <span>Angle: {post.angle}</span>}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => showContent('post', post)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Post Copy"
                  >
                    <FileCode className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showContent('caption', post)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Caption Copy"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showContent('postStructure', post)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Post Structure"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => showContent('captionStructure', post)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Caption Structure"
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content popup */}
      {selectedContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedContent(null)} />
          <MobileStructurePopup
            isOpen={!!selectedContent}
            onClose={() => setSelectedContent(null)}
            title={selectedContent.title}
            content={selectedContent.text}
            onCopy={handleCopy}
            copied={copied}
          />
        </div>
      )}
    </>
  );
};