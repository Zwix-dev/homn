import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
    // ou pour tout autoriser (non recommandé) :
    // unoptimized: true
  },
};


export default nextConfig;
