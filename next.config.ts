import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true, // Enable PPR/Cache Components (Next.js 16.1 unified config)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
