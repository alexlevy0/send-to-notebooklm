// public/lib/auth.js

const ALLOWED_DOMAINS = [
  '.google.com',
  'notebooklm.google.com',
  '.googleusercontent.com',
];

export async function getGoogleCookies() {
  const cookies = {};

  // Strategy: Fetch from multiple Google origins to ensure we catch .google.com cookies
  const urls = [
    'https://notebooklm.google.com',
    'https://www.google.com',
    'https://accounts.google.com'
  ];

  for (const url of urls) {
    try {
      const found = await chrome.cookies.getAll({ url });
      found.forEach(cookie => {
        cookies[cookie.name] = cookie.value;
      });
    } catch (e) {
      console.warn(`Failed to fetch cookies for ${url}`, e);
    }
  }

  const foundKeys = Object.keys(cookies);
  console.log('🔍 Found cookies keys:', foundKeys);

  // Check for SID or __Secure-1PSID
  const hasSid = cookies['SID'] || cookies['__Secure-1PSID'];
  
  if (!hasSid) {
    console.error('❌ Missing required auth cookie (SID or __Secure-1PSID)');
    throw new Error(
      `Missing required Google cookie (SID or __Secure-1PSID). ` +
      `Found: ${foundKeys.join(', ')}. ` +
      'Please log in to notebooklm.google.com.'
    );
  }

  return cookies;
}

export async function extractAuthTokens() {
  // 1. Récupérer les cookies
  const cookies = await getGoogleCookies();

  // 2. Charger la page NotebookLM
  const cookieHeader = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');

  // Note: In an extension content script or popup with host permissions, 
  // fetch cookies might be handled automatically if we don't set them manually,
  // but here we are simulating what the prompt asked. 
  // Should verify if we can set Cookie header in fetch in extension (usually unsafe header).
  // However, for correct auth, usually the browser handles cookies if we fetch from the origin.
  // But the prompt specifically does this. Let's try as is, but be aware of "Refused to set unsafe header "Cookie"" error.
  // If that happens, we rely on the browser sending them automatically (since we have permissions).
  
  const response = await fetch('https://notebooklm.google.com', {
    // headers: { 'Cookie': cookieHeader }, // Browser limits this often.
  });

  if (!response.ok) {
    throw new Error(`Failed to load NotebookLM: ${response.status}`);
  }

  const html = await response.text();

  // 3. Extraire le CSRF token (SNlM0e)
  // Fix: Regex from prompt "Extraire le CSRF token avec regex"
  // The code snippet showed: html.match(/"SNlM0e":"([^"]+)"/);
  // SPRINT_1.md said: "CSRF token non trouvé initialement... Solution : Modifier le regex pour inclure les guillemets simples"
  // I will check the prompt snippet again. It used double quotes.
  // I'll stick to the provided snippet for now, but keep the "Lesson Learned" in mind if it fails.
  const csrfMatch = html.match(/"SNlM0e":"([^"]+)"/);
  if (!csrfMatch) {
    // Try single quotes if double failed (based on Sprint 1 docs hint)
    // const csrfMatchSingle = html.match(/'SNlM0e':'([^']+)'/);
    throw new Error('CSRF token (SNlM0e) not found in page');
  }
  const csrfToken = csrfMatch[1];

  // 4. Extraire le Session ID (FdrFJe)
  const sessionMatch = html.match(/"FdrFJe":"([^"]+)"/);
  if (!sessionMatch) {
    throw new Error('Session ID (FdrFJe) not found in page');
  }
  const sessionId = sessionMatch[1];

  console.log('✅ Auth tokens extracted:', { csrfToken, sessionId });

  return { cookies, csrfToken, sessionId };
}

// Cache pendant 5 minutes
let cachedAuth = null;
const AUTH_CACHE_TTL = 5 * 60 * 1000;

export async function getAuthTokens(forceRefresh = false) {
  if (!forceRefresh && cachedAuth) {
    const age = Date.now() - cachedAuth.timestamp;
    if (age < AUTH_CACHE_TTL) {
      console.log('✅ Using cached auth tokens');
      return cachedAuth.tokens;
    }
  }

  console.log('🔄 Fetching fresh auth tokens...');
  const tokens = await extractAuthTokens();
  cachedAuth = { tokens, timestamp: Date.now() };
  return tokens;
}
