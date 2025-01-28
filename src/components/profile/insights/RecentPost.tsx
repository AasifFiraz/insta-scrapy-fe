import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProfileDetailedInfo } from '../../../types/profile';

interface RecentPostProps {
  profile: ProfileDetailedInfo;
}

export const RecentPost: React.FC<RecentPostProps> = ({ profile }) => {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-4">Most Recent Post</h3>
      <div className="aspect-square bg-white/10 rounded-lg mb-4 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&h=400" 
          alt="Recent post"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Posted 2h ago</span>
          <a href="#" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm">
            View Post
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Likes: <span className="text-white">2.4k</span></span>
          <span className="text-gray-400">Comments: <span className="text-white">128</span></span>
          <span className="text-gray-400">Shares: <span className="text-white">45</span></span>
        </div>
      </div>
    </div>
  );
};