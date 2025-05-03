import React, { useEffect, useRef } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Message as MessageType } from './types';
import { Message } from './Message';

interface ChatWindowProps {
  title: string;
  messages: MessageType[];
  placeholderText: string;
  onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  title,
  messages,
  placeholderText,
  onClose,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  return (
    <div
      className={`w-full max-w-[375px] h-[500px] bg-white rounded-lg shadow-xl flex flex-col 
                overflow-hidden transition-all duration-500 ease-in-out transform
                sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]
                ${isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10'}
                ${isClosing ? 'scale-90 opacity-0 translate-y-10' : ''}`}
    >
      {/* Header */}
      <div className={`bg-[#21214D] px-4 py-3 flex items-center justify-between
                    transition-transform duration-500 ease-in-out
                    ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-[#D9C9B3] animate-bounce" />
          <h3 className="text-white font-medium">{title}</h3>
        </div>
        <button 
          onClick={handleClose}
          aria-label="Close chat"
          className="text-white/80 hover:text-white transition-all duration-300 
                   hover:rotate-90 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 relative">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQEbOiSbvCyx5FdP7jWd9pGU920_VhIcfSha549mDfP3QYab2ze1yqAXt5TLLHu2vna0&usqp=CAU" 
            alt="Christ University Logo"
            className="w-64 h-64 object-contain"
          />
        </div>
        <div className="space-y-4 relative z-10">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`transition-all duration-500 ease-in-out
                       ${isVisible ? 'translate-x-0 opacity-100' : 
                         message.sender === 'user' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'}
                       `}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Message message={message} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className={`p-3 border-t border-gray-200 bg-white
                    transition-all duration-500 ease-in-out
                    ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={placeholderText}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 
                     focus:outline-none focus:ring-2 focus:ring-[#21214D]/30
                     transition-all duration-300 ease-in-out
                     hover:shadow-md"
            //disabled
          />
          <button
            aria-label="Send message"
            // disabled
            className="w-10 h-10 bg-[#21214D] rounded-full flex items-center justify-center
                     text-white disabled:opacity-70 transition-all duration-300 ease-in-out
                     hover:bg-[#21214D]/90 hover:shadow-md hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};