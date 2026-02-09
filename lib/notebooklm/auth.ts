/// <reference types="chrome" />
import type { AuthTokens } from "./types";

const AUTH_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cachedAuth: AuthTokens | null = null;

export async function getGoogleCookies(): Promise<Record<string, string>> {
  const cookies: Record<string, string> = {};

  // Strategy: Fetch from multiple Google origins to ensure we catch .google.com cookies
  const urls = [
    "https://notebooklm.google.com",
    "https://www.google.com",
    "https://accounts.google.com",
  ];

  for (const url of urls) {
    try {
      const found = await chrome.cookies.getAll({ url });
      found.forEach((cookie) => {
        cookies[cookie.name] = cookie.value;
      });
    } catch (e) {
      console.warn(`Failed to fetch cookies for ${url}`, e);
    }
  }

  const foundKeys = Object.keys(cookies);
  // console.log('🔍 Found cookies keys:', foundKeys);

  // Check for SID or __Secure-1PSID
  const hasSid = cookies["SID"] || cookies["__Secure-1PSID"];

  if (!hasSid) {
    console.error("❌ Missing required auth cookie (SID or __Secure-1PSID)");
    throw new Error(
      `Missing required Google cookie (SID or __Secure-1PSID). ` +
        `Found: ${foundKeys.join(", ")}. ` +
        "Please log in to notebooklm.google.com.",
    );
  }

  return cookies;
}

export async function extractAuthTokens(): Promise<AuthTokens> {
  // 1. Get cookies
  const cookies = await getGoogleCookies();

  // 2. Fetch NotebookLM page to get tokens
  const response = await fetch("https://notebooklm.google.com");

  if (!response.ok) {
    throw new Error(`Failed to load NotebookLM: ${response.status}`);
  }

  const html = await response.text();

  // 3. Extract CSRF token (SNlM0e)
  const csrfMatch = html.match(/"SNlM0e":"([^"]+)"/);
  if (!csrfMatch) {
    throw new Error("CSRF token (SNlM0e) not found in page");
  }
  const csrfToken = csrfMatch[1];

  // 4. Extract Session ID (FdrFJe)
  const sessionMatch = html.match(/"FdrFJe":"([^"]+)"/);
  if (!sessionMatch) {
    throw new Error("Session ID (FdrFJe) not found in page");
  }
  const sessionId = sessionMatch[1];

  console.log("✅ Auth tokens extracted:", { csrfToken, sessionId });

  return { cookies, csrfToken, sessionId, timestamp: Date.now() };
}

export async function getAuthTokens(forceRefresh = false): Promise<AuthTokens> {
  if (!forceRefresh && cachedAuth) {
    const age = Date.now() - cachedAuth.timestamp;
    if (age < AUTH_CACHE_TTL) {
      // console.log('✅ Using cached auth tokens');
      return cachedAuth;
    }
  }

  console.log("🔄 Fetching fresh auth tokens...");
  const tokens = await extractAuthTokens();
  cachedAuth = tokens;
  return tokens;
}
