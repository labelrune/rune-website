import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: true,
  },
  env: {
    META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID
  }
};

export default nextConfig;
