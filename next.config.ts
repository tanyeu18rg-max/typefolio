import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pure static site: `next build` emits a fully static `out/` directory.
  output: 'export',
  images: {
    // next/image optimization requires a server; serve pre-sized assets instead.
    unoptimized: true,
  },
};

export default nextConfig;
