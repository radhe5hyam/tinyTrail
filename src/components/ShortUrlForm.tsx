import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UrlShortenerFormProps {
  longUrl: string;
  setLongUrl: (url: string) => void;
  handleShorten: () => void;
}

const ShortUrlForm: React.FC<UrlShortenerFormProps> = ({
  longUrl,
  setLongUrl,
  handleShorten,
}) => {
  return (
    <>
      <Input
        type="text"
        placeholder="Enter long URL here"
        className="w-full max-w-md"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <Button
        className="w-full max-w-md my-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={handleShorten}
      >
        Shorten it
      </Button>
    </>
  );
};

export default ShortUrlForm;
