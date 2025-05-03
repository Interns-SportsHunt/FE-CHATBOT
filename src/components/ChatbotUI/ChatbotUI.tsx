import React, { useState } from 'react';
import { ChatbotUIProps } from './types';
import { LauncherButton } from './LauncherButton';
import { ChatWindow } from './ChatWindow';

export const ChatbotUI: React.FC<ChatbotUIProps> = ({
  title = 'Christ Chat Assistant',
  initialMessages = [
    {
      id: '1',
      sender: 'bot',
      text: 'Hello! How can I help you today?',
      timestamp: new Date(),
    },
    {
      id: '2',
      sender: 'user',
      text: 'I have a question about my account.',
      timestamp: new Date(),
    },
    {
      id: '3',
      sender: 'bot',
      text: 'Of course! I\'d be happy to help with any account-related questions you might have. Could you please provide more specific details about your question?',
      timestamp: new Date(),
    },
  ],
  placeholderText = 'Type your message here...',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <ChatWindow
          title={title}
          messages={initialMessages}
          placeholderText={placeholderText}
          onClose={toggleChat}
        />
      ) : (
        <LauncherButton onClick={toggleChat} />
      )}
    </div>
  );
};