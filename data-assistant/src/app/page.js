'use client';

import { useState } from 'react';
import ChatWindow from './components/ChatWindow';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8 h-screen">
        <div className="flex flex-col h-full max-w-4xl mx-auto">
          <header className="text-center mb-6">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Personal Data Assistant
            </h1>
            <div className="flex items-center justify-center mb-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </span>
              </label>
            </div>
          </header>
          
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border dark:border-gray-700">
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
}