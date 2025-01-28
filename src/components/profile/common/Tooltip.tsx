import React, { useState, useRef } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useClickOutside(tooltipRef, () => setIsVisible(false));

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-64 p-2 mt-2 text-sm text-white bg-black border border-white/10 rounded-lg shadow-xl -left-28 top-full">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-black border-t border-l border-white/10" />
          <div className="relative">{content}</div>
        </div>
      )}
    </div>
  );
};