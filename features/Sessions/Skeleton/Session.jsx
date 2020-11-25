import React from "react";

const SessionSkeleton = () => {
  return (
    <div className="block animate-pulse hover:bg-gray-50">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="w-56 text-sm font-medium text-gray-100 truncate bg-gray-100 rounded-md">
              <p className="capitalize">Placeholder title</p>
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm text-gray-100 bg-gray-100 rounded-md w-72">
                <p>Estimated Duration</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 mt-4 sm:mt-0">
            <div className="flex overflow-hidden">
              {[1, 2, 3, 4, 5].map((item, idx) => (
                <div
                  key={idx}
                  className="inline-block w-6 h-6 bg-gray-100 rounded-full ring-2 ring-white"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionSkeleton;
