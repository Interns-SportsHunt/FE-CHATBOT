import React, { useState, useEffect } from 'react';
import { LauncherButton } from './components/launchbutton';
import { X, Send } from 'lucide-react';
import backgroundImg from './assets/10fee074fd9d0961a918c7ca7bf3455f4d0f3712.png'; // Adjust path if needed

export const ChatbotUI = ({
  title = 'Chatbot',
  initialMessages = [],
  placeholderText = 'Type your message...',
  backgroundImage = backgroundImg,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const toggleChat = () => {
    setIsOpen(prev => {
      const next = !prev;
      if (next && !hasOpenedOnce) {
        setMessages([
          { from: 'bot', text: 'Hello! I’m your AI assistant. How can I help you today?' }
        ]);
        setHasOpenedOnce(true);
      }
      return next;
    });
  };
  

  const handleSend = () => {
    if (input.trim() === '') return;
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: generateBotReply(input) },
      ]);
      setIsThinking(false);
    }, 2000);
  };

  const generateBotReply = (inputText) => {
    // You can replace this logic with your AI response logic
    const lower = inputText.toLowerCase();
    if (lower.includes('help')) return 'Sure, I can assist with various topics. Try asking me a question!';
    if (lower.includes('weather')) return 'I currently do not have access to live weather data.';
    if (lower.includes('joke')) return 'Why did the JavaScript developer leave? Because they didn’t get arrays!';
    return 'That’s interesting! Can you tell me more?';
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 font-sans">
      {isOpen ? (
        <>
          {/* Chat Window */}
          <div className="w-80 h-96 bg-blue-900 rounded-xl shadow-xl flex flex-col overflow-hidden border border-gray-300">
            {/* Header */}
            <div className="bg-blue-900 text-gray-100 px-4 py-3 font-semibold border-b border-gray-300 select-none">
              {title}
            </div>

            {/* Chat area */}
            <div className="relative flex-1 px-4 py-3 bg-gray-800 overflow-hidden">
              {/* Blurred background */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(4px)',
                  opacity: 0.4,
                  zIndex: 0,
                }}
              />
              {/* Messages container */}
              <div className="relative z-10 flex flex-col space-y-2 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                {messages.length === 0 ? (
                  <p className="text-center text-gray-400 mt-6 select-none">
                    Start the conversation...
                  </p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`max-w-[75%] px-4 py-2 rounded-3xl break-words shadow-sm
                        ${
                          msg.from === 'user'
                            ? 'bg-blue-900 text-white self-end rounded-br-none'
                            : 'bg-gray-800 text-gray-100 self-start rounded-bl-none'
                        }`}
                    >
                      {msg.text}
                    </div>
                  ))
                )}

                {/* Thinking Indicator */}
                {isThinking && (
                  <div className="self-start bg-gray-200 text-gray-900 rounded-3xl px-4 py-2 flex items-center justify-center gap-1 w-16 animate-pulse rounded-bl-none">
                    <span className="animate-bounce delay-0">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Input Section */}
            <div className="flex items-center px-4 py-2 bg-blue-900 border-t border-gray-300">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={placeholderText}
                className="flex-1 bg-gray-800 border border-gray-300 rounded-full px-4 py-2 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={handleSend}
                className="ml-3 text-amber-300 hover:scale-120 transition-all hover:text-amber-400 focus:outline-none"
                aria-label="Send"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={toggleChat}
            aria-label="Close chat"
            className="w-12 h-12 bg-blue-900 hover:bg-blue-800 hover:scale-110 hover:rotate-180 text-white rounded-full flex items-center justify-center shadow-lg
                       transform transition-all duration-300 ease-in-out
                       active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2"
          >
            <X className="w-5 h-5" />
          </button>
        </>
      ) : (
        <LauncherButton onClick={toggleChat} />
      )}
    </div>
  );
};
