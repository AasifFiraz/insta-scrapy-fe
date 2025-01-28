import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ToolbarButtonProps {
  icon: LucideIcon;
  tooltip: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon: Icon,
  tooltip,
  onClick,
  disabled
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`p-2 rounded hover:bg-white/5 transition-colors ${
        disabled
          ? 'text-gray-600 cursor-not-allowed'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
};