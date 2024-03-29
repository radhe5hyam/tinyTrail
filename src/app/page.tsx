"use client";
import React, { useState } from "react";
import { TbHomeLink } from "react-icons/tb";
import ShortUrlForm from "@/components/ShortUrlForm";
import ShortUrlDisplay from "@/components/ShortUrlDisplay";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isShortened, setIsShortened] = useState(false);

  const handleShorten = async () => {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original: longUrl }),
      });
      const data = await response.json();
      setShortUrl(window.location.origin + "/api/" + data.short);
      setIsShortened(true);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard && shortUrl) {
      navigator.clipboard
        .writeText(shortUrl)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    } else {
      console.error("Clipboard API not supported or shortUrl is undefined");
    }
  };
  const handleReset = () => {
    setLongUrl("");
    setShortUrl("");
    setIsShortened(false);
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="px-6 shadow-2xl rounded-xl bg-[#DAD2FF] dark:bg-[#4C585B] flex flex-col items-center justify-center min-w-1/3 min-h-1/2 fixed left-0 top-1/4 ml-4">
        <TbHomeLink className="my-4 text-4xl" />
        <h6 className="text-xl mb-4">Shorten your URL</h6>

        {!isShortened ? (
          <ShortUrlForm
            longUrl={longUrl}
            setLongUrl={setLongUrl}
            handleShorten={handleShorten}
          />
        ) : (
          <ShortUrlDisplay
            longUrl={longUrl}
            shortUrl={shortUrl}
            handleCopy={handleCopy}
            handleReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
