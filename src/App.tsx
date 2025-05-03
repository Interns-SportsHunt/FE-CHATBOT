import React from 'react';
import ChatbotUI from './components/ChatbotUI';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our Platform</h1>
        <p className="text-gray-600 mb-6">
          This is a demonstration of our chatbot interface. The floating button in the bottom-right
          corner opens a chat window. Feel free to interact with it!
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Main Content</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
            vestibulum vestibulum. Cras porttitor metus vel ipsum finibus ullamcorper.
          </p>
        </div>
      </div>
      <ChatbotUI />
    </div>
  );
}

export default App;