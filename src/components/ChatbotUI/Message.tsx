import React from 'react';
import { Message as MessageType } from './types';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 ${
          isUser 
            ? 'bg-[#D9C9B3] text-gray-800' 
            : 'bg-[#21214D]/90 text-white border border-[#21214D]/20'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div 
          className={`text-xs mt-1 ${isUser ? 'text-gray-700' : 'text-gray-300'}`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};