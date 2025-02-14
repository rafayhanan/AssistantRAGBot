import { FileText } from 'lucide-react';

export default function Message({ message, isFirstMessage, onFileUpload }) {
  const isUser = message.type === 'user';
  const isFileUploadMessage = message.isFileUpload;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
          AI
        </div>
      )}
      
      <div 
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm
          ${isUser 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-tr-none' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
          }
          ${isFileUploadMessage ? 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100' : ''}
        `}
      >
        {isFileUploadMessage ? (
          <div className="flex items-center">
            <FileText className="mr-2" size={16} />
            <span>{message.content}</span>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message.content}</div>
        )}
        
        {isFirstMessage && (
          <div className="mt-4">
            <input
              type="file"
              id="file-upload"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => document.getElementById('file-upload').click()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors shadow-sm"
            >
              <FileText className="mr-2" size={16} />
              Upload PDF
            </button>
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white ml-2 flex-shrink-0">
          You
        </div>
      )}
    </div>
  );
}