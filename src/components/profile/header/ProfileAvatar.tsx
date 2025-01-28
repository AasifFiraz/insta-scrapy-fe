import React from 'react';

interface ProfileAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ 
  src, 
  alt,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-16 h-16 sm:w-24 sm:h-24',
    lg: 'w-20 h-20 sm:w-32 sm:h-32'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-xl overflow-hidden bg-white/5 shrink-0`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};