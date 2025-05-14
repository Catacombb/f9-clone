import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
