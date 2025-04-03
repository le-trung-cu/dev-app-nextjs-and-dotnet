import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5247',
        pathname: '/**',
        search: '',
      },
    ],
  }
};

export default nextConfig;
