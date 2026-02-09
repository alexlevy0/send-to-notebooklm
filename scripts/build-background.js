const esbuild = require('esbuild');
const path = require('path');

async function build() {
  await esbuild.build({
    entryPoints: [path.join(__dirname, '../lib/background.ts')],
    outfile: path.join(__dirname, '../public/background.js'),
    bundle: true,
    minify: false, // Keep readable for now, set true for prod
    platform: 'browser',
    target: ['chrome100'],
    format: 'esm', // Service workers support ESM in newer Chrome, but iife is safer usually. Let's try iife for compatibility if needed, but 'esm' allows top level await if targeted correctly. Chrome extensions SW often needed to be separate files or bundled.
    // Chrome Extension Service Workers run in a specialized environment.
    // 'iife' is usually safer for a single file bundle without imports.
    format: 'iife', 
  });
  console.log('✅ Background script built successfully');
}

build().catch(() => process.exit(1));
