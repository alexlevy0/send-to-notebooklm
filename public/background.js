"use strict";
(() => {
  // lib/notebooklm/auth.ts
  var AUTH_CACHE_TTL = 5 * 60 * 1e3;
  var cachedAuth = null;
  async function getGoogleCookies() {
    const cookies = {};
    const urls = [
      "https://notebooklm.google.com",
      "https://www.google.com",
      "https://accounts.google.com"
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
    const hasSid = cookies["SID"] || cookies["__Secure-1PSID"];
    if (!hasSid) {
      console.error("\u274C Missing required auth cookie (SID or __Secure-1PSID)");
      throw new Error(
        `Missing required Google cookie (SID or __Secure-1PSID). Found: ${foundKeys.join(", ")}. Please log in to notebooklm.google.com.`
      );
    }
    return cookies;
  }
  async function extractAuthTokens() {
    const cookies = await getGoogleCookies();
    const response = await fetch("https://notebooklm.google.com");
    if (!response.ok) {
      throw new Error(`Failed to load NotebookLM: ${response.status}`);
    }
    const html = await response.text();
    const csrfMatch = html.match(/"SNlM0e":"([^"]+)"/);
    if (!csrfMatch) {
      throw new Error("CSRF token (SNlM0e) not found in page");
    }
    const csrfToken = csrfMatch[1];
    const sessionMatch = html.match(/"FdrFJe":"([^"]+)"/);
    if (!sessionMatch) {
      throw new Error("Session ID (FdrFJe) not found in page");
    }
    const sessionId = sessionMatch[1];
    console.log("\u2705 Auth tokens extracted:", { csrfToken, sessionId });
    return { cookies, csrfToken, sessionId, timestamp: Date.now() };
  }
  async function getAuthTokens(forceRefresh = false) {
    if (!forceRefresh && cachedAuth) {
      const age = Date.now() - cachedAuth.timestamp;
      if (age < AUTH_CACHE_TTL) {
        return cachedAuth;
      }
    }
    console.log("\u{1F504} Fetching fresh auth tokens...");
    const tokens = await extractAuthTokens();
    cachedAuth = tokens;
    return tokens;
  }

  // lib/notebooklm/constants.ts
  var NOTEBOOKLM_BASE_URL = "https://notebooklm.google.com";
  var BATCHEXECUTE_URL = `${NOTEBOOKLM_BASE_URL}/_/LabsTailwindUi/data/batchexecute`;

  // lib/notebooklm/rpc.ts
  async function rpcCall(method, params, auth, sourcePath = "notebooks", retryCount = 0) {
    const url = new URL(BATCHEXECUTE_URL);
    url.searchParams.set("f.sid", auth.sessionId);
    url.searchParams.set("source-path", sourcePath);
    const requestPayload = [[[method, JSON.stringify(params), null, "generic"]]];
    const body = new URLSearchParams({
      "f.req": JSON.stringify(requestPayload),
      at: auth.csrfToken
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "X-Same-Domain": "1"
    };
    const response = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: body.toString()
    });
    if (response.status === 401 || response.status === 403) {
      if (retryCount < 1) {
        console.warn(`RPC ${response.status} - Retrying with fresh tokens...`);
        const newAuth = await getAuthTokens(true);
        return rpcCall(method, params, newAuth, sourcePath, retryCount + 1);
      }
    }
    if (!response.ok) {
      const errorText = await response.text();
      console.error("RPC Error Body:", errorText.substring(0, 500));
      throw new Error(
        `RPC call failed: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}`
      );
    }
    const rawResponse = await response.text();
    const cleaned = rawResponse.replace(/^\)\]\}'\n/, "");
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      throw new Error("Invalid JSON in RPC response");
    }
    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      throw new Error("Invalid RPC response format (empty)");
    }
    const envelope = parsed.find((item) => Array.isArray(item) && item[0] === method) || parsed[0];
    if (!envelope || !Array.isArray(envelope) || envelope.length < 3) {
      throw new Error("Invalid RPC response structure");
    }
    const resultString = envelope[2];
    if (typeof resultString === "string") {
      return JSON.parse(resultString);
    }
    return resultString;
  }

  // lib/notebooklm/api.ts
  var NotebookLM = {
    async listNotebooks() {
      const auth = await getAuthTokens();
      const params = [null, 50];
      const response = await rpcCall("wXbhsf" /* LIST_NOTEBOOKS */, params, auth, "notebooks");
      if (!response || !Array.isArray(response) || !response[0]) {
        console.warn("Unexpected listNotebooks response", response);
        return [];
      }
      const nbListRaw = response[0];
      if (!Array.isArray(nbListRaw)) {
        return [];
      }
      const notebooks = nbListRaw.map((nb) => {
        const title = nb[0];
        const id = nb[2];
        return { id, title };
      }).filter((nb) => nb.id && nb.title);
      return notebooks;
    },
    async addUrlSource(notebookId, url) {
      const auth = await getAuthTokens();
      const payload = [
        [
          [
            null,
            null,
            [url],
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            1
            // 1 = URL source type
          ]
        ],
        notebookId
      ];
      try {
        await rpcCall("izAoDd" /* ADD_SOURCE */, payload, auth, "notebooks");
        return true;
      } catch (e) {
        console.error("Failed to add source:", e);
        throw e;
      }
    },
    async addTextSource(notebookId, title, content) {
      const auth = await getAuthTokens();
      const payload = [
        [
          [
            null,
            [title, content],
            null,
            null,
            null,
            null,
            null,
            null
          ]
        ],
        notebookId,
        [2],
        // Source type flag for Text
        null,
        null
      ];
      try {
        await rpcCall("izAoDd" /* ADD_SOURCE */, payload, auth, `notebook/${notebookId}`);
        return true;
      } catch (e) {
        console.error("Failed to add text source:", e);
        throw e;
      }
    }
  };

  // lib/background.ts
  console.log("\u{1F680} Background service worker loaded (TypeScript)");
  chrome.runtime.onInstalled.addListener(() => {
    console.log("\u{1F4CB} Creating context menu...");
    chrome.contextMenus.create({
      id: "send-to-notebooklm",
      title: "Send to NotebookLM",
      contexts: ["selection"]
    });
    console.log("\u2705 Context menu created");
  });
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log("Context menu clicked:", info);
    if (info.menuItemId === "send-to-notebooklm") {
      try {
        const result = await chrome.storage.local.get("lastNotebook");
        const lastNotebook = result.lastNotebook;
        if (!lastNotebook || !lastNotebook.id) {
          console.warn("No notebook selected yet");
          await chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon-48.png",
            title: "No Notebook Selected",
            message: "Please open the extension and select a notebook first."
          });
          return;
        }
        console.log("Adding to notebook:", lastNotebook);
        const selectedText = info.selectionText || "";
        const pageTitle = tab?.title || "Untitled";
        const sourceTitle = `Selection from ${pageTitle}`;
        await NotebookLM.addTextSource(lastNotebook.id, sourceTitle, selectedText);
        await chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon-48.png",
          title: "Captured! \u2713",
          message: `Text added to "${lastNotebook.title}"`
        });
        console.log("\u2705 Text added successfully");
      } catch (error) {
        console.error("\u274C Failed to send to NotebookLM:", error);
        await chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon-48.png",
          title: "Error",
          message: error.message || "Failed to add text"
        });
      }
    }
  });
})();
