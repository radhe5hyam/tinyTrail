import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-[#6366f1] via-[#a5b4fc] to-[#e0e7ff] dark:bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] dark:from-[#27272a] dark:via-[#52525b] dark:to-[#a1a1aa] bg-cover bg-no-repeat">
        <ThemeProvider>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
