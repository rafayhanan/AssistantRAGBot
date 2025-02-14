import { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';

export default function InputArea({ onSendMessage, onReset, isFirstMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isFirstMessage ? "Upload a PDF file first..." : "Type your message here..."}
          className="w-full rounded-full border border-gray-300 dark:border-gray-600 pl-4 pr-24 py-3 outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-all"
          disabled={isFirstMessage}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <button
            type="button"
            onClick={onReset}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            title="Reset conversation"
          >
            <RefreshCw size={20} />
          </button>
          <button
            type="submit"
            disabled={isFirstMessage || !message.trim()}
            className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}