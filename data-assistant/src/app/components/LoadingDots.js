export default function LoadingDots() {
  return (
    <div className="flex justify-start py-2">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" 
               style={{ animationDelay: '0ms', animationDuration: '1s' }} />
          <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" 
               style={{ animationDelay: '200ms', animationDuration: '1s' }} />
          <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" 
               style={{ animationDelay: '400ms', animationDuration: '1s' }} />
        </div>
      </div>
    </div>
  );
}