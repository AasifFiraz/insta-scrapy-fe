import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
      <div className="bg-red-500 p-1.5 rounded">
        <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <span className="text-white font-bold text-lg sm:text-xl">POSTLYZE</span>
    </Link>
  );
};