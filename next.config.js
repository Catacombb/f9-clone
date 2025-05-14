/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    VAPI_API_KEY: process.env.VAPI_API_KEY,
  },
  // Ensure we can use environment variables in both server and client components
  serverRuntimeConfig: {
    VAPI_API_KEY: process.env.VAPI_API_KEY,
  },
  publicRuntimeConfig: {
    // Add any public runtime configs here if needed
  },
};

module.exports = nextConfig; 