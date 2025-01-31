"use client";
import React, { useState } from "react";
import { TbHomeLink } from "react-icons/tb";
import ThemeToggle from "../components/ThemeToggle";
import ShortUrlForm from "@/components/ShortUrlForm";
import ShortUrlDisplay from "@/components/ShortUrlDisplay";

export default function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [expiry, setExpiry] = React.useState<Date | undefined>(new Date());
  const [isShortened, setIsShortened] = useState(false);

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
    <main className="flex flex-col items-center h-screen">
      <header className="p-4 flex justify-end w-full">
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
            handleCopy={handleCopy}
            handleReset={handleReset}
          />
        )}
      </div>
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
