import { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import InputArea from './InputArea';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const chatWindowRef = useRef(null);

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const initialMessage = {
      type: 'bot',
      content: "👋 Hello there! I'm your friendly data assistant, ready to answer any questions regarding your data. Could you please upload a PDF file for me to analyze?"
    };
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/process-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: message }),
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { type: 'bot', content: data.botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, there was an error processing your message. Please try again later.' 
      }]);
    }

    setIsLoading(false);
  };

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: `Uploading file: ${file.name}`,
      isFileUpload: true
    }]);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/process-document', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      setMessages(prev => [...prev, { type: 'bot', content: data.botResponse }]);
      setIsFirstMessage(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Sorry, there was an error processing your file. Please make sure it\'s a valid PDF and try again.' 
      }]);
    }

    setIsLoading(false);
  };

  const handleReset = () => {
    setMessages([{
      type: 'bot',
      content: "👋 Hello there! I'm your friendly data assistant, ready to answer any questions regarding your data. Could you please upload a PDF file for me to analyze?"
    }]);
    setIsFirstMessage(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatWindowRef}
        className="flex-1 overflow-auto p-6"
      >
        <MessageList 
          messages={messages} 
          isLoading={isLoading}
          isFirstMessage={isFirstMessage}
          onFileUpload={handleFileUpload}
        />
      </div>
      <InputArea 
        onSendMessage={handleSendMessage} 
        onReset={handleReset}
        isFirstMessage={isFirstMessage}
      />
    </div>
  );
}