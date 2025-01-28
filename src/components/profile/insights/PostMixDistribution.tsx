import React from 'react';
import { Image } from 'lucide-react';

interface PostMixDistributionProps {
  postMix?: {
    reels: number;
    carousels: number;
    images: number;
  };
}

export const PostMixDistribution: React.FC<PostMixDistributionProps> = ({ postMix }) => {
  if (!postMix) {
    return null;
  }

  const postMixData = [
    { label: 'Reels', value: postMix.reels, color: 'from-purple-500 to-pink-500' },
    { label: 'Carousels', value: postMix.carousels, color: 'from-blue-500 to-cyan-500' },
    { label: 'Images', value: postMix.images, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Post Mix</h3>
        <Image className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {postMixData.map(({ label, value, color }) => (
          <div key={label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">{label}</span>
              <span className="text-white">{value}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${color}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
