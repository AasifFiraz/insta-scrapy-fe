import React from 'react';
import { ViewMode } from './ViewToggle';
import { ViewToggle } from './ViewToggle';
import { PostsSorting } from './PostsSorting';

interface PostsGridSkeletonProps {
  viewMode: ViewMode;
}

export const PostsGridSkeleton: React.FC<PostsGridSkeletonProps> = ({ viewMode }) => {
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between sticky top-16 bg-black/95 backdrop-blur-sm -mx-4 px-4 py-2 z-10">
        <ViewToggle mode={viewMode} onChange={() => {}} />
        <PostsSorting value="recent" onChange={() => {}} />
      </div>

      {viewMode === 'grid' ? (
        // Grid View Skeleton
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg overflow-hidden">
              <div className="aspect-square bg-white/5 animate-pulse relative">
                {/* Gradient overlay skeleton */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                  <div className="absolute bottom-0 inset-x-0 p-2 sm:p-3 space-y-2">
                    {/* Caption skeleton */}
                    <div className="space-y-1">
                      <div className="h-2 bg-white/10 rounded animate-pulse" />
                      <div className="h-2 bg-white/10 rounded animate-pulse w-2/3" />
                    </div>
                    {/* Stats skeleton */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex gap-3">
                        <div className="h-2 bg-white/10 rounded animate-pulse w-12" />
                        <div className="h-2 bg-white/10 rounded animate-pulse w-12" />
                      </div>
                      <div className="h-2 bg-white/10 rounded animate-pulse w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View Skeleton
        <>
          {/* Desktop table skeleton */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-white/10">
                  <th className="pb-3 font-medium text-left">Caption</th>
                  <th className="pb-3 font-medium text-right">Likes</th>
                  <th className="pb-3 font-medium text-right">Comments</th>
                  <th className="pb-3 font-medium text-right">Posted</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/5 rounded animate-pulse" />
                        <div className="space-y-1 flex-1">
                          <div className="h-2 bg-white/5 rounded animate-pulse w-full" />
                          <div className="h-2 bg-white/5 rounded animate-pulse w-2/3" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="h-2 bg-white/5 rounded animate-pulse w-16 ml-auto" />
                    </td>
                    <td className="py-4">
                      <div className="h-2 bg-white/5 rounded animate-pulse w-16 ml-auto" />
                    </td>
                    <td className="py-4">
                      <div className="h-2 bg-white/5 rounded animate-pulse w-20 ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list skeleton */}
          <div className="md:hidden space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3">
                <div className="flex gap-3">
                  <div className="w-20 h-20 bg-white/10 rounded animate-pulse shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="space-y-1">
                      <div className="h-2 bg-white/10 rounded animate-pulse w-full" />
                      <div className="h-2 bg-white/10 rounded animate-pulse w-2/3" />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-3">
                        <div className="h-2 bg-white/10 rounded animate-pulse w-12" />
                        <div className="h-2 bg-white/10 rounded animate-pulse w-12" />
                      </div>
                      <div className="h-2 bg-white/10 rounded animate-pulse w-16" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};