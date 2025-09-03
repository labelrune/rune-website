import React from 'react';

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="p-6 w-full max-w-7xl space-y-6 sm:space-y-0 sm:flex sm:gap-8 sm:items-start">
        <div className="w-full sm:w-1/2 h-[300px] md:h-[700px] bg-gray-300 rounded-lg mb-4 sm:mb-0 animate-pulse">
        </div>

        <div className="w-full sm:w-1/2">
          <div className="h-12 bg-gray-300 rounded w-3/4 sm:w-1/2 mb-4 animate-pulse"></div>

          <div className="h-20 bg-gray-300 rounded w-full sm:w-4/5 mb-4 animate-pulse"></div>

          <div className="h-8 bg-gray-300 rounded w-5/6 sm:w-3/4 mb-4 animate-pulse"></div>

          <div className="w-full sm:hidden flex justify-between space-x-4 mt-4">
            <div className="h-16 w-16 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-16 w-16 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-16 w-16 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Loading;
