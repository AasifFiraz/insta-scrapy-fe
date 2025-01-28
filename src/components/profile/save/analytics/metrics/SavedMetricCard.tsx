import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SavedMetricCardProps {
  label: string;
  value: string;
  change?: string;
  subValue?: string;
  icon: LucideIcon;
}

export const SavedMetricCard: React.FC<SavedMetricCardProps> = ({ 
  label, 
  value, 
  change,
  subValue,
  icon: Icon 
}) => {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{label}</span>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-2xl font-bold text-white">{value}</div>
        {change && (
          <div className={`text-sm ${
            change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {change}
          </div>
        )}
      </div>
      {subValue && (
        <div className="text-sm text-gray-400 mt-1">{subValue}</div>
      )}
    </div>
  );
};