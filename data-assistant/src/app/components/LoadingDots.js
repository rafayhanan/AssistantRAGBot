export default function LoadingDots() {
    return (
      <div className="flex justify-start">
        <div className="bg-[#efefef] rounded-2xl rounded-tl-none px-4 py-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
        </div>
      </div>
    );
  }