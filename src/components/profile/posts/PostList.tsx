import React, { useState } from 'react';
import { Post } from '../../../types/post';
import { formatNumber } from '../../../utils/numberFormat';
import { formatDistanceToNow } from '../../../utils/dateFormat';
import { FileText, AlignLeft, FileCode, MessageSquare, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { MobileStructurePopup } from '../../common/MobileStructurePopup';
import { generateCaptionStructure, processPostMedia } from '../../../services/postsService';
import { EmptyState } from './EmptyState';
import { PostType } from '../../../types/postType';
import { orderBy } from 'lodash';
import { PostSkeleton } from './PostSkeleton';

interface PostListProps {
  posts: Post[];
  postType?: PostType | 'all';
  startDate?: Date | null;
  endDate?: Date | null;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
  showPagination?: boolean;
  isLoading: boolean;
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
  endDate,
  currentPage,
  hasNextPage,
  hasPreviousPage,
  onNextPage,
  onPreviousPage,
  showPagination = true,
  isLoading
}) => {
  const [selectedContent, setSelectedContent] = useState<PopupContent | null>(null);
  const [copied, setCopied] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: 'posted' | 'topic' | 'angle' | 'goal' | 'likes' | 'comments' | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'desc' });

  // Show loading message when loading
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Informative message about posts loading */}
        <div className="bg-white/5 rounded-xl p-6 text-center">
          <p className="text-white mb-3">Posts are currently being fetched, please give it a few minutes and come back.</p>
          <p className="text-gray-400 text-sm">We're retrieving and analyzing the latest posts from this profile.</p>
        </div>
      </div>
    );
  }

  // Show empty state when no posts and not loading
  if (posts.length === 0) {
    return (
      <>
        <EmptyState
          postType={postType}
          startDate={startDate}
          endDate={endDate}
        />

        {/* Show pagination only if not on page 1 or explicitly told to show it */}
        {(currentPage > 1 && showPagination) && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={onPreviousPage}
              disabled={!hasPreviousPage}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-white/10 hover:bg-white/20 text-white"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-gray-400 text-xs font-medium min-w-[3rem] text-center">
              Page {currentPage}
            </span>
            <button
              disabled={true}
              className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-white/5 text-gray-500 cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </>
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
        // Show loading state immediately
        setSelectedContent({
          type,
          text: '',
          postType: post.type,
          title: 'Post Copy',
          isLoading: true
        });

        if (post.media && post.media.length > 0) {
          try {
            // Process media to get extracted text
            const extractedText = await processPostMedia(post.media);

            // Update with extracted text
            setSelectedContent({
              type,
              text: extractedText,
              postType: post.type,
              title: 'Post Copy',
              isLoading: false
            });
            return;
          } catch (error) {
            console.error('Error processing media:', error);
            setSelectedContent({
              type,
              text: post.copy.post,
              postType: post.type,
              title: 'Post Copy',
              isLoading: false
            });
            return;
          }
        } else {
          setSelectedContent({
            type,
            text: post.copy.post,
            postType: post.type,
            title: 'Post Copy',
            isLoading: false
          });
        }
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

    // if (type !== 'post') {
      setSelectedContent({ type, text, postType: post.type, title });
    // }
  };

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto overflow-y-hidden">
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
                      className="p-2 rounded-lg text-gray-400/50 cursor-not-allowed group relative"
                      title="Coming Soon"
                      disabled
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg text-gray-400/50 cursor-not-allowed group relative"
                      title="Coming Soon"
                      disabled
                    >
                      <AlignLeft className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls - Only show if explicitly told to */}
        {showPagination && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={onPreviousPage}
              disabled={!hasPreviousPage || isLoading}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                hasPreviousPage && !isLoading
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Previous page"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
            <span className="text-gray-400 text-xs font-medium min-w-[3rem] text-center">
              Page {currentPage}
            </span>
            <button
              onClick={onNextPage}
              disabled={!hasNextPage || isLoading}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                hasNextPage && !isLoading
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Next page"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
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
                    className="p-2 rounded-lg bg-white/5 text-gray-400/50 cursor-not-allowed group relative"
                    title="Coming Soon"
                    disabled
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-lg bg-white/5 text-gray-400/50 cursor-not-allowed group relative"
                    title="Coming Soon"
                    disabled
                  >
                    <AlignLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Mobile Pagination Controls - Only show if explicitly told to */}
        {showPagination && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={onPreviousPage}
              disabled={!hasPreviousPage || isLoading}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                hasPreviousPage && !isLoading
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Previous page"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
            <span className="text-gray-400 text-xs font-medium min-w-[3rem] text-center">
              Page {currentPage}
            </span>
            <button
              onClick={onNextPage}
              disabled={!hasNextPage || isLoading}
              className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                hasNextPage && !isLoading
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-white/5 text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Next page"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Content popup */}
      {selectedContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedContent(null)} />
          <MobileStructurePopup
            isOpen={!!selectedContent}
            onClose={() => setSelectedContent(null)}
            title={selectedContent?.title || ''}
            content={selectedContent?.text || ''}
            contentType={selectedContent?.type || 'post'}
            onCopy={handleCopy}
            copied={copied}
            isLoading={selectedContent?.isLoading}
          />
        </div>
      )}
    </>
  );
};
