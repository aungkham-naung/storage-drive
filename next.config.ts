import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.pixabay.com"
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io"
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com"
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com"
      }
    ]
  }
};

export default nextConfig;
