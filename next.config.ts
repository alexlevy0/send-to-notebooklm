import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  /* config options here */
  // reactCompiler: true, // Commenting out if not needed or causing issues, but keeping structure
};

export default nextConfig;
