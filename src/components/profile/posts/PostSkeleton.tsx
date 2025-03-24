import React from 'react';

export const PostSkeleton: React.FC = () => {
  return (
    <div className="bg-white/5 rounded-lg p-4 space-y-4 animate-pulse">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Post Type Icon */}
          <div className="w-6 h-6 bg-white/10 rounded" />
          {/* Post Date */}
          <div className="w-24 h-4 bg-white/10 rounded" />
        </div>
        {/* Engagement Stats */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-4 bg-white/10 rounded" />
          <div className="w-16 h-4 bg-white/10 rounded" />
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-2">
        {/* Post Text */}
        <div className="w-full h-4 bg-white/10 rounded" />
        <div className="w-3/4 h-4 bg-white/10 rounded" />
        <div className="w-1/2 h-4 bg-white/10 rounded" />
      </div>

      {/* Post Metadata */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-4">
          {/* Topic & Angle */}
          <div className="w-20 h-4 bg-white/10 rounded" />
          <div className="w-20 h-4 bg-white/10 rounded" />
        </div>
        {/* Goal */}
        <div className="w-16 h-4 bg-white/10 rounded" />
      </div>
    </div>
  );
};
