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
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center space-x-2 rounded-full border border-gray-300 px-4 py-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 outline-none bg-transparent"
          disabled={isFirstMessage}
        />
        <button
          type="submit"
          disabled={isFirstMessage || !message.trim()}
          className="text-blue-600 disabled:text-gray-400"
        >
          <Send size={24} />
        </button>
        <button
          type="button"
          onClick={onReset}
          className="text-blue-600"
        >
          <RefreshCw size={24} />
        </button>
      </div>
    </form>
  );
}