import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Using server-side rendering for Vercel deployment
  trailingSlash: true, // Add trailing slashes to URLs
};

export default nextConfig;
