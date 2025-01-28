import React from 'react';
import { Bot } from 'lucide-react';

interface ChatTabProps {
  handle: string;
}

export const ChatTab: React.FC<ChatTabProps> = ({ handle }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400">
      <Bot className="w-12 h-12 mb-4" />
      <p>Chat feature coming soon!</p>
    </div>
  );
};