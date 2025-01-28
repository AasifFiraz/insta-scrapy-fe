import React from 'react';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { Post } from '../../../types/post';
import { formatNumber } from '../../../utils/numberFormat';
import { formatDistanceToNow } from '../../../utils/dateFormat';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="group relative bg-white/5 rounded-lg overflow-hidden hover:ring-1 hover:ring-white/20 transition-all">
      {/* Media container */}
      <div className={`relative ${post.type === 'reel' ? 'aspect-[9/16]' : 'aspect-square'}`}>
        <img
          src={post.thumbnail}
          alt={post.caption}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Stats overlay - Always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2 sm:p-3">
          {/* Caption */}
          <p className="text-white text-xs sm:text-sm font-medium line-clamp-2 mb-2 sm:mb-3">
            {post.caption}
          </p>
          
          {/* Stats */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3 text-white/90">
              <div className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" />
                <span className="text-xs">{formatNumber(post.stats.likes)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="text-xs">{formatNumber(post.stats.comments)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-white/60">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{formatDistanceToNow(new Date(post.createdAt))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};