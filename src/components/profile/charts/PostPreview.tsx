import React from 'react';
import { Post } from '../../../types/metrics';
import { Heart, MessageCircle } from 'lucide-react';

interface PostPreviewProps {
  post: Post;
}

export const PostPreview: React.FC<PostPreviewProps> = ({ post }) => {
  return (
    <div className="bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 w-[280px]">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{post.comments}</span>
            </div>
          </div>
          <span className="text-white/80">{post.timestamp}</span>
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-white text-sm font-medium line-clamp-2">{post.title}</h4>
      </div>
    </div>
  );
};