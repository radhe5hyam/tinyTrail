import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeProvider } from "./themeProvider";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Tiny Trail",
  description: "yet another url shortner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white dark:bg-gray-900">
        <ThemeProvider>
          <header className="p-4 flex justify-end">
            <ThemeToggle />
          </header>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
