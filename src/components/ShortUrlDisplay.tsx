import React from "react";
import { Button } from "@/components/ui/button";
import { MdCopyAll, MdInsertLink, MdOpenInNew } from "react-icons/md";
import { BsMagic } from "react-icons/bs";

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
      <div className="mt-4">
        <p className="flex items-center">
          <MdInsertLink className="mr-2" />
          Original URL:
        </p>
        <p>{longUrl}</p>
        <p className="mt-4 flex items-center">
          <BsMagic className="mr-2" />
          Tiny Trail URL:
        </p>
        <p>{shortUrl}</p>
      </div>
      <div className="flex space-x-4">
        <Button
          className="w-full max-w-md my-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() => window.open(shortUrl, "_blank")}
        >
          <MdOpenInNew /> Visit URL
        </Button>
        <Button
          className="w-full max-w-md my-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleCopy}
        >
          <MdCopyAll /> Copy
        </Button>
      </div>
      <Button
        className="w-full max-w-md my-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
        onClick={handleReset}
      >
        Shorten Another URL
      </Button>
    </>
  );
};

export default ShortUrlDisplay;
