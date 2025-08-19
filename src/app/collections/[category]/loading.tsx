import React from 'react';

const Loading = () => {
  return (
    <div className="w-screen flex justify-center items-center">
      <div className="p-4 w-full max-w-7xl">
        <div className="h-12 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-20 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-5/6 mb-2 animate-pulse"></div>
        <div className="h-24 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="mt-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
