import React, { useState, useRef, useEffect } from 'react';
import { Bot } from 'lucide-react';
import chatbotVideo from '/Users/surajdas/chatbot/src/assets/chatbot.mp4';

export const LauncherButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to beginning if needed
      }
    }
  }, [isHovered]);

  return (
    <button
      aria-label="Open chat"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-14 h-14 bg-[#21214D] rounded-full flex items-center justify-center shadow-lg
                 transform transition-all duration-500 ease-in-out
                 hover:scale-110  hover:shadow-2xl
                 active:scale-95
                 focus:outline-none focus:ring-2 focus:ring-[#D9C9B3] focus:ring-offset-2"
    >
      <video
        ref={videoRef}
        src={chatbotVideo}
        muted
        loop
        playsInline
        className="w-10 h-10 object-cover rounded-full"
      />
    </button>
  );
};
