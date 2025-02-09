export default function Message({ message, isFirstMessage, onFileUpload }) {
    const isUser = message.type === 'user';
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        onFileUpload(file);
      }
    };
  
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isUser 
            ? 'bg-[#e7f9d8] rounded-tr-none' 
            : 'bg-[#efefef] rounded-tl-none'
        }`}>
          <div>{message.content}</div>
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Upload File
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }