import React from 'react';

interface ProBadgeProps {
  className?: string;
}

export const ProBadge: React.FC<ProBadgeProps> = ({ className = '' }) => {
  return (
    <span 
      className={`text-[10px] text-white bg-gradient-to-r from-purple-500 to-pink-500 px-1.5 rounded leading-normal ${className}`}
    >
      PRO
    </span>
  );
};