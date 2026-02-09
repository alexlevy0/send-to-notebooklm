const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const NEXT_DIR = path.join(DIST_DIR, '_next');
const NEW_NEXT_DIR = path.join(DIST_DIR, 'next');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// 1. Rename _next to next
if (fs.existsSync(NEXT_DIR)) {
  console.log('Renaming _next to next...');
  fs.renameSync(NEXT_DIR, NEW_NEXT_DIR);
} else {
  console.warn('_next directory not found in dist. Maybe build failed or already renamed?');
}

// 2. Update reference in popup.html and extract inline scripts (CSP fix)
// When built with Next.js App Router:
// - `app/page.tsx` -> `index.html` (Landing Page)
// - `app/popup/page.tsx` -> `popup.html` (Extension Popup)

const POPUP_FILE = path.join(DIST_DIR, 'popup.html');

if (fs.existsSync(POPUP_FILE)) {
  console.log('Processing popup.html...');
  let html = fs.readFileSync(POPUP_FILE, 'utf8');
  
  // Inject Global Error Handler at the top of <head>
  const errorHandlerScript = `
  <script>
    window.addEventListener('error', function(event) {
      const errorDiv = document.createElement('div');
      errorDiv.style.position = 'fixed';
      errorDiv.style.top = '0';
      errorDiv.style.left = '0';
      errorDiv.style.width = '100%';
      errorDiv.style.backgroundColor = '#fee2e2'; // red-100
      errorDiv.style.color = '#991b1b'; // red-800
      errorDiv.style.padding = '8px';
      errorDiv.style.zIndex = '99999';
      errorDiv.style.fontSize = '12px';
      errorDiv.style.borderBottom = '1px solid #ef4444';
      errorDiv.innerText = 'JS Error: ' + event.message;
      document.body.appendChild(errorDiv);
    });
    window.addEventListener('unhandledrejection', function(event) {
      const errorDiv = document.createElement('div');
      errorDiv.style.position = 'fixed';
      errorDiv.style.top = '24px';
      errorDiv.style.left = '0';
      errorDiv.style.width = '100%';
      errorDiv.style.backgroundColor = '#ffedd5'; // orange-100
      errorDiv.style.color = '#9a3412'; // orange-800
      errorDiv.style.padding = '8px';
      errorDiv.style.zIndex = '99999';
      errorDiv.style.fontSize = '12px';
      errorDiv.style.borderBottom = '1px solid #f97316';
      errorDiv.innerText = 'Promise Error: ' + (event.reason ? event.reason.message || event.reason : 'Unknown');
      document.body.appendChild(errorDiv);
    });
  </script>
  `;
  
  html = html.replace('<head>', '<head>' + errorHandlerScript);
  
  // Fix _next paths
  html = html.replace(/\/_next\//g, '/next/');

  // Extract inline scripts
  // Regex to match <script>...</script> (without src attribute)
  // We use a simple regex assumption that inline scripts don't have src.
  // Next.js inline scripts are usually just <script>...</script>
  
  let inlineScriptsContent = '';
  const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
  
  html = html.replace(scriptRegex, (match, content) => {
    if (content.trim()) {
      inlineScriptsContent += content + ';\n';
      return ''; // Remove the inline script from HTML
    }
    return match; // Keep empty scripts if any (unlikely)
  });

  if (inlineScriptsContent) {
    console.log('Extracting inline scripts to init.js...');
    const initScriptPath = path.join(DIST_DIR, 'init.js');
    fs.writeFileSync(initScriptPath, inlineScriptsContent);
    
    // Add reference to init.js at the end of body
    html = html.replace('</body>', '<script src="/init.js"></script></body>');
  }

  fs.writeFileSync(POPUP_FILE, html);
} else {
  console.warn('popup.html not found in dist. (Make sure app/popup/page.tsx exists)');
}

// 3. Replace /_next/ with /next/ in all Javascript files
function replaceInFile(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('/_next/')) {
      console.log(`Patching paths in: ${path.basename(filePath)}`);
      content = content.replace(/\/_next\//g, '/next/');
      fs.writeFileSync(filePath, content);
    }
  }
}

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  });
}

console.log('Patching JS bundles...');
processDirectory(DIST_DIR);

// 4. Remove any files/dirs starting with _ or . (Chrome Extension restriction)
fs.readdirSync(DIST_DIR).forEach(file => {
  if (file.startsWith('_') || file.startsWith('.')) {
    const filePath = path.join(DIST_DIR, file);
    console.log(`Removing restricted file/dir: ${file}`);
    fs.rmSync(filePath, { recursive: true, force: true });
  }
});

console.log('Extensions post-build complete.');
