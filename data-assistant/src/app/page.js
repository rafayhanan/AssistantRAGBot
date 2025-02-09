'use client';

import { useState } from 'react';
import ChatWindow from './components/ChatWindow';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#121717] text-gray-300' : 'bg-[#d6ddec]'}`}>
      <div className="container mx-auto px-4 py-8 h-screen">
        <div className="flex flex-col h-full max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Personal Data Assistant</h1>
            <div className="flex items-center justify-center mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3">Toggle dark mode</span>
              </label>
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-[#263443] rounded-lg shadow-lg overflow-hidden">
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
}
