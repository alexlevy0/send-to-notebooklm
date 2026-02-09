// Import des modules (si tu utilises des modules ES6)
// Sinon, copie les fonctions directement ici

console.log('🚀 Background service worker loaded');

// Créer le menu contextuel au démarrage
chrome.runtime.onInstalled.addListener(() => {
  console.log('📋 Creating context menu...');
  
  chrome.contextMenus.create({
    id: 'send-to-notebooklm',
    title: 'Send to NotebookLM',
    contexts: ['selection'],
  });

  console.log('✅ Context menu created');
});

// Gérer les clics sur le menu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('Context menu clicked:', info);

  if (info.menuItemId === 'send-to-notebooklm') {
    try {
      // 1. Récupérer le notebook par défaut depuis storage
      const result = await chrome.storage.local.get('lastNotebook');
      const lastNotebook = result.lastNotebook;

      if (!lastNotebook || !lastNotebook.id) {
        console.warn('No notebook selected yet');
        await chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon-48.png',
          title: 'No Notebook Selected',
          message: 'Please open the extension and select a notebook first.',
        });
        return;
      }

      console.log('Adding to notebook:', lastNotebook);

      // 2. Préparer les données
      const selectedText = info.selectionText;
      const pageTitle = tab.title || 'Untitled';
      const sourceTitle = `Selection from ${pageTitle}`;

      // 3. Appeler l'API NotebookLM
      // Note: On doit recréer la logique ici car background.js ne peut pas importer depuis lib/
      await addTextSourceFromBackground(lastNotebook.id, sourceTitle, selectedText);

      // 4. Notification de succès
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-48.png',
        title: 'Captured! ✓',
        message: `Text added to "${lastNotebook.title}"`,
      });

      console.log('✅ Text added successfully');
    } catch (error) {
      console.error('❌ Failed to send to NotebookLM:', error);

      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-48.png',
        title: 'Error',
        message: error.message || 'Failed to add text',
      });
    }
  }
});

// ============================================
// API Functions (copié depuis lib/notebooklm/)
// ============================================

const BATCHEXECUTE_URL = 'https://notebooklm.google.com/_/LabsTailwindUi/data/batchexecute';

async function addTextSourceFromBackground(notebookId, title, content) {
  console.log('Getting auth tokens...');
  const auth = await getAuthTokensFromBackground();

  const params = [
    [
      [
        null,
        [title, content],
        null,
        null,
        null,
        null,
        null,
        null,
      ],
    ],
    notebookId,
    [2],
    null,
    null,
  ];

  console.log('Calling RPC ADD_SOURCE...');
  const response = await rpcCallFromBackground('izAoDd', params, auth, `notebook/${notebookId}`);
  
  console.log('RPC response:', response);
  return response;
}

async function getAuthTokensFromBackground() {
  // 1. Récupérer les cookies
  const cookies = await getGoogleCookiesFromBackground();

  // 2. Charger la page NotebookLM
  const response = await fetch('https://notebooklm.google.com');
  if (!response.ok) {
    throw new Error(`Failed to load NotebookLM: ${response.status}`);
  }

  const html = await response.text();

  // 3. Extraire les tokens
  const csrfMatch = html.match(/"SNlM0e":"([^"]+)"/);
  if (!csrfMatch) {
    throw new Error('CSRF token not found');
  }

  const sessionMatch = html.match(/"FdrFJe":"([^"]+)"/);
  if (!sessionMatch) {
    throw new Error('Session ID not found');
  }

  return {
    cookies,
    csrfToken: csrfMatch[1],
    sessionId: sessionMatch[1],
  };
}

async function getGoogleCookiesFromBackground() {
  const cookies = {};
  const urls = [
    'https://notebooklm.google.com',
    'https://www.google.com',
    'https://accounts.google.com',
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

  const hasSid = cookies['SID'] || cookies['__Secure-1PSID'];
  if (!hasSid) {
    throw new Error('Missing required Google cookie. Please log in to NotebookLM.');
  }

  return cookies;
}

async function rpcCallFromBackground(method, params, auth, sourcePath) {
  const url = new URL(BATCHEXECUTE_URL);
  url.searchParams.set('f.sid', auth.sessionId);
  url.searchParams.set('source-path', sourcePath);

  const requestPayload = [[[method, JSON.stringify(params), null, 'generic']]];
  
  const body = new URLSearchParams({
    'f.req': JSON.stringify(requestPayload),
    'at': auth.csrfToken,
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Same-Domain': '1',
  };

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers,
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`RPC call failed: ${response.status}`);
  }

  const rawResponse = await response.text();
  
  // Parser la réponse
  const cleaned = rawResponse.replace(/^\)\]\}'\n/, '');
  const parsed = JSON.parse(cleaned);

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('Invalid RPC response');
  }

  const wrappedResult = parsed[0];
  if (!Array.isArray(wrappedResult) || wrappedResult.length < 3) {
    throw new Error('Invalid RPC response structure');
  }

  const resultString = wrappedResult[2];
  if (typeof resultString === 'string') {
    return JSON.parse(resultString);
  }

  return resultString;
}
