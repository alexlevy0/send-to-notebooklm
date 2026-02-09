const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");

// Read .env.local manually
const envVars = {};
try {
  const envFile = fs.readFileSync(
    path.join(__dirname, "../.env.local"),
    "utf8",
  );
  envFile.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      envVars[`process.env.${match[1]}`] = JSON.stringify(match[2].trim());
    }
  });
} catch (e) {
  console.warn("⚠️ Could not read .env.local:", e.message);
}

(async () => {
  await esbuild.build({
    entryPoints: [path.join(__dirname, '../lib/background.ts')],
    outfile: path.join(__dirname, '../public/background.js'),
    bundle: true,
    minify: false, // Keep readable for now, set true for prod
    platform: 'browser',
    target: ['chrome100'],
    // Service workers support ESM in newer Chrome, but iife is safer usually. Let's try iife for compatibility if needed, but 'esm' allows top level await if targeted correctly. Chrome extensions SW often needed to be separate files or bundled.
    // Chrome Extension Service Workers run in a specialized environment.
    // 'iife' is usually safer for a single file bundle without imports.
    format: 'iife',
    define: {
      'process.env.NODE_ENV': '"production"',
      ...envVars
    }
  });
  console.log('✅ Background script built successfully');
})();
