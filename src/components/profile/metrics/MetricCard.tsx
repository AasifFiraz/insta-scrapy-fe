import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  change?: string; // Make change optional
  icon: LucideIcon;
}

export const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, icon: Icon }) => {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm">{label}</span>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="text-2xl font-bold text-white mb-2">{value}</div>
      {change && ( // Only render change if it exists
        <div className={`text-sm ${
          change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {change}
        </div>
      )}
    </div>
  );
};
