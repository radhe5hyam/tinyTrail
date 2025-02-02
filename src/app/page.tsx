"use client";
import React, { useState, useEffect } from "react";
import { TbHomeLink } from "react-icons/tb";
import ThemeToggle from "../components/ThemeToggle";
import ShortUrlForm from "../components/ShortUrlForm"; // Updated import path
import ShortUrlDisplay from "../components/ShortUrlDisplay";
import UrlList from "../components/UrlList";

interface Url {
  longUrl: string;
  shortUrl: string;
}

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expiry, setExpiry] = React.useState<Date | undefined>(new Date());
  const [isShortened, setIsShortened] = useState(false);
  const [urls, setUrls] = useState<Url[]>([]);
  const [showUrls, setShowUrls] = useState(false);

  useEffect(() => {
    const storedUrls = JSON.parse(
      localStorage.getItem("shortenedUrls") || "[]"
    );
    setUrls(storedUrls);
  }, []);

  const handleShorten = async () => {
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ original: longUrl, expiry }),
      });
      const data = await response.json();
      const newShortUrl = window.location.origin + "/api/" + data.short;
      setShortUrl(newShortUrl);
      setIsShortened(true);

      const newUrl = { longUrl, shortUrl: newShortUrl };
      const updatedUrls = [...urls, newUrl];
      setUrls(updatedUrls);
      localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const handleCopy = (url: string) => {
    if (navigator.clipboard && url) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    } else {
      console.error("Clipboard API not supported or url is undefined");
    }
  };

  const handleReset = () => {
    setLongUrl("");
    setShortUrl("");
    setIsShortened(false);
  };

  const toggleUrls = () => {
    setShowUrls(!showUrls);
  };

  return (
    <main className="flex flex-col items-center h-screen">
      <header className="p-4 flex justify-between w-full">
        <button onClick={toggleUrls} className="mr-auto">
          My URLs
        </button>
        <ThemeToggle />
      </header>
      <div
        className="flex flex-col items-center justify-center flex-grow px-8 py-6 shadow-2xl rounded-xl bg-[#DAD2FF] dark:bg-[#4C585B] w-full max-w-3xl"
        style={{ marginTop: "20vh", marginBottom: "10vh" }}
      >
        <TbHomeLink className="my-4 text-4xl" />
        <h6 className="text-xl mb-4">Shorten your URL</h6>

        {!isShortened ? (
          <ShortUrlForm
            longUrl={longUrl}
            setLongUrl={setLongUrl}
            setExpiry={setExpiry}
            handleShorten={handleShorten}
          />
        ) : (
          <ShortUrlDisplay
            longUrl={longUrl}
            shortUrl={shortUrl}
            handleCopy={() => handleCopy(shortUrl)}
            handleReset={handleReset}
          />
        )}
      </div>
      {showUrls && (
        <UrlList urls={urls} handleCopy={handleCopy} toggleUrls={toggleUrls} />
      )}
      <footer className="p-4 text-center w-full">
        <p>
          Made with <span className="text-red-500 dark:text-red-400">❤</span> by{" "}
          <a
            href="https://github.com/radhe5hyam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400"
          >
            @radhe5hyam
          </a>
        </p>
        <p>Copyright © 2025</p>
      </footer>
    </main>
  );
}
