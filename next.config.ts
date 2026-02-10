import type { NextConfig } from "next";

const isExtensionBuild = process.env.NEXT_PUBLIC_EXT_BUILD === 'true';

const nextConfig: NextConfig = {
  output: isExtensionBuild ? 'export' : undefined,
  distDir: isExtensionBuild ? 'dist' : '.next',
  images: {
    unoptimized: true,
  },
  /* config options here */
  // reactCompiler: true, // Commenting out if not needed or causing issues, but keeping structure
};

export default nextConfig;
