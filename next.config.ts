import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['imgv3.fotor.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgv3.fotor.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
};

export default nextConfig;
