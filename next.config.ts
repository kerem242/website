import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use export mode in production build, not during development
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
