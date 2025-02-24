import React, { useState } from 'react';
import { Post } from '../../../types/post';
import { formatNumber } from '../../../utils/numberFormat';
import { formatDistanceToNow } from '../../../utils/dateFormat';
import { FileText, AlignLeft, FileCode, MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';
import { MobileStructurePopup } from '../../common/MobileStructurePopup';
import { generateCaptionStructure } from '../../../services/postsService';
import { EmptyState } from './EmptyState';
import { PostType } from '../../../types/postType';
import { orderBy } from 'lodash';

interface PostListProps {
  posts: Post[];
  postType?: PostType | 'all';
  startDate?: Date | null;
  endDate?: Date | null;
}

type PopupContent = {
  type: 'post' | 'caption' | 'postStructure' | 'captionStructure';
  text: string;
  postType: string;
  title: string;
  isLoading?: boolean;
}

export const PostList: React.FC<PostListProps> = ({ 
  posts, 
  postType = 'all',
  startDate,
  endDate
}) => {
  const [selectedContent, setSelectedContent] = useState<PopupContent | null>(null);
  const [copied, setCopied] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: 'posted' | 'topic' | 'angle' | 'goal' | 'likes' | 'comments' | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'desc' });

  if (posts.length === 0) {
    return (
      <EmptyState 
        postType={postType}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  const handleSort = (key: typeof sortConfig.key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const getSortedPosts = () => {
    if (!sortConfig.key) return posts;

    const sortKey = sortConfig.key === 'posted' ? 'createdAt' : 
                   sortConfig.key === 'likes' ? 'stats.likes' :
                   sortConfig.key === 'comments' ? 'stats.comments' :
                   sortConfig.key;

    return orderBy(posts, [sortKey], [sortConfig.direction]);
  };

  const sortedPosts = getSortedPosts();

  const SortIcon = ({ columnKey }: { columnKey: typeof sortConfig.key }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === 'desc' ? 
      <ArrowDown className="w-4 h-4 inline-block ml-1" /> : 
      <ArrowUp className="w-4 h-4 inline-block ml-1" />;
  };

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

  const showContent = async (type: PopupContent['type'], post: Post) => {
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
        // Show loading state immediately
        setSelectedContent({
          type,
          text: '',
          postType: post.type,
          title: 'Caption Structure',
          isLoading: true
        });

        try {
          // Generate caption structure
          const structuredCaption = await generateCaptionStructure(
            post.copy.caption,
            post.context
          );
          
          // Update with generated content
          setSelectedContent({
            type,
            text: structuredCaption,
            postType: post.type,
            title: 'Caption Structure',
            isLoading: false
          });
          return;
        } catch (error) {
          console.error('Error generating caption structure:', error);
          setSelectedContent({
            type,
            text: 'Failed to generate caption structure. Please try again.',
            postType: post.type,
            title: 'Caption Structure',
            isLoading: false
          });
          return;
        }
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
              <th className="pb-3 font-medium w-[350px]">Title</th>
              <th 
                className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('posted')}
              >
                Posted <SortIcon columnKey="posted" />
              </th>
              <th 
                className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('topic')}
              >
                Topic <SortIcon columnKey="topic" />
              </th>
              <th 
                className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('goal')}
              >
                Goal <SortIcon columnKey="goal" />
              </th>
              <th 
                className="pb-3 font-medium cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('angle')}
              >
                Angle <SortIcon columnKey="angle" />
              </th>
              <th 
                className="pb-3 font-medium text-center cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('likes')}
              >
                Likes <SortIcon columnKey="likes" />
              </th>
              <th 
                className="pb-3 font-medium text-center cursor-pointer hover:text-white transition-colors"
                onClick={() => handleSort('comments')}
              >
                Comments <SortIcon columnKey="comments" />
              </th>
              <th className="pb-3 font-medium text-center">Copy</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {sortedPosts.map(post => (
              <tr key={post.id} className="border-b border-white/5">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.thumbnail} 
                      alt={post.caption}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <a 
                      href={post.post_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white line-clamp-2 hover:underline cursor-pointer"
                    >
                      {post.caption}
                    </a>
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
        {sortedPosts.map(post => (
          <div key={post.id} className="bg-white/5 rounded-lg p-3">
            <div className="flex gap-3">
              <img
                src={post.thumbnail}
                alt={post.caption}
                className="w-20 h-20 rounded object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <a
                  href={post.post_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm line-clamp-2 mb-2 hover:underline"
                >
                  {post.caption}
                </a>
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
            content={selectedContent.isLoading ? 'Generating caption structure...' : selectedContent.text}
            onCopy={handleCopy}
            copied={copied}
            isLoading={selectedContent.isLoading}
          />
        </div>
      )}
    </>
  );
};
