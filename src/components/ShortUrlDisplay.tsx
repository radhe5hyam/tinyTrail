import React from "react";
import { Button } from "./ui/button";
import { MdCopyAll, MdInsertLink, MdOpenInNew } from "react-icons/md";
import { BsMagic } from "react-icons/bs";
import { Input } from "./ui/input";

interface ShortenedUrlDisplayProps {
  longUrl: string;
  shortUrl: string;
  handleCopy: () => void;
  handleReset: () => void;
}

const ShortUrlDisplay: React.FC<ShortenedUrlDisplayProps> = ({
  longUrl,
  shortUrl,
  handleCopy,
  handleReset,
}) => {
  return (
    <>
      <div className="mb-4 w-full">
        <div className="flex items-center mb-2">
          <MdInsertLink className="mr-2" />
          <span className="font-bold">Original URL:</span>
        </div>
        <Input
          type="text"
          readOnly
          className="w-full my-4 rounded-full h-12"
          value={longUrl}
        />
      </div>
      <div className="mb-4 w-full">
        <div className="flex items-center mb-2">
          <BsMagic className="mr-2" />
          <span className="font-bold">Tiny Trail URL:</span>
        </div>
        <Input
          type="text"
          readOnly
          className="w-full my-4 rounded-full h-12"
          value={shortUrl}
        />
      </div>
      <div className="flex space-x-4 mb-4 w-full">
        <Button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => window.open(shortUrl, "_blank")}
        >
          <MdOpenInNew className="mr-2" /> Visit URL
        </Button>
        <Button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleCopy}
        >
          <MdCopyAll className="mr-2" /> Copy
        </Button>
      </div>
      <Button
        className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg"
        onClick={handleReset}
      >
        Shorten Another URL
      </Button>
    </>
  );
};

export default ShortUrlDisplay;
