import React from 'react';
import { Bot } from 'lucide-react';

interface LauncherButtonProps {
  onClick: () => void;
}

export const LauncherButton: React.FC<LauncherButtonProps> = ({ onClick }) => {
  return (
    <button
      aria-label="Open chat"
      onClick={onClick}
      className="w-14 h-14 bg-[#21214D] rounded-full flex items-center justify-center shadow-lg
                 transform transition-all duration-500 ease-in-out
                 hover:scale-110 hover:rotate-[360deg] hover:shadow-2xl
                 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-[#D9C9B3] focus:ring-offset-2"
    >
      <Bot className="w-6 h-6 text-white transition-transform duration-500 ease-in-out" />
    </button>
  );
};