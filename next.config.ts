import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '147.182.200.106',
        port: '',       // <--- Empty means standard Port 80
        pathname: '/media/**' 
      },
      // Keep localhost for development if needed
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;