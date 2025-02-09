import Message from './Message';
import LoadingDots from './LoadingDots';

export default function MessageList({ messages, isLoading, isFirstMessage, onFileUpload }) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
          isFirstMessage={isFirstMessage && index === 0}
          onFileUpload={onFileUpload}
        />
      ))}
      {isLoading && <LoadingDots />}
    </div>
  );
}