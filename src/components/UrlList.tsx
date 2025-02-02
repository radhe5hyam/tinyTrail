"use client";
import React, { useEffect, useRef } from "react";

interface Url {
  longUrl: string;
  shortUrl: string;
}

interface UrlListProps {
  urls: Url[];
  handleCopy: (url: string) => void;
  toggleUrls: () => void;
}

const UrlList: React.FC<UrlListProps> = ({ urls, handleCopy, toggleUrls }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleUrls();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleUrls]);

  return (
    <aside
      ref={ref}
      className="fixed right-0 top-0 h-full w-1/3 bg-[#DAD2FF] dark:bg-[#4C585B] shadow-lg p-4 overflow-y-auto rounded-l-xl transition-transform transform translate-x-0"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          My URLs
        </h2>
        <button
          onClick={toggleUrls}
          className="text-xl text-gray-900 dark:text-gray-100"
        >
          Close
        </button>
      </div>
      {urls.length > 0 ? (
        urls.map((url, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <p className="text-gray-900 dark:text-gray-100 truncate">
              {url.longUrl}
            </p>
            <p className="text-blue-500 dark:text-blue-400 truncate">
              {url.shortUrl}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleCopy(url.shortUrl)}
              >
                Copy
              </button>
              <a
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-900 dark:text-gray-100">No URLs found</p>
      )}
    </aside>
  );
};

export default UrlList;
