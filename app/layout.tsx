import type { Metadata } from "next";
import "./globals.css";
import ChatbotLoader from './components/ChatbotLoader';

export const metadata: Metadata = {
  title: "F9 Productions | Colorado Architecture Firm",
  description: "F9 Productions is a premier architecture and design firm serving all of Colorado, specializing in residential, multi-family, and commercial architecture.",
  keywords: "architecture, Colorado architects, residential architecture, commercial architecture, F9 Productions, design build",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DHTMLX ChatBot CSS */}
        <link rel="stylesheet" href="https://cdn.dhtmlx.com/chatbot/latest/chatbot.css" />
      </head>
      <body>
        {children}
        
        {/* Include the ChatbotLoader component */}
        <ChatbotLoader />
      </body>
    </html>
  );
}
