import { NotebookLM } from "./notebooklm/api";
import { checkLimit, incrementUsage } from "./supabase";

console.log('🚀 Background service worker loaded (TypeScript)');

// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('📋 Creating context menu...');
  
  chrome.contextMenus.create({
    id: 'send-to-notebooklm',
    title: 'Send to NotebookLM',
    contexts: ['selection'],
  });

  console.log('✅ Context menu created');
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  console.log('Context menu clicked:', info);

  if (info.menuItemId === 'send-to-notebooklm') {
    try {
      // 1. Get default notebook from storage
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

      // NOUVEAU : 2. Check limits BEFORE capture
      const limitStatus = await checkLimit();
      if (!limitStatus.allowed) {
        await chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icons/icon-48.png',
          title: '⚡ Limit Reached',
          message: limitStatus.reason === 'daily_limit' 
            ? 'Daily limit reached (10 captures). Upgrade to Pro for unlimited captures.'
            : 'Monthly limit reached (200 captures). Upgrade to Pro for unlimited captures.',
          buttons: [{ title: "Upgrade to Pro" }]
        });
        return;
      }

      console.log('Adding to notebook:', lastNotebook);

      // 2. Prepare data
      const selectedText = info.selectionText || "";
      const pageTitle = tab?.title || 'Untitled';
      const sourceTitle = `Selection from ${pageTitle}`;

      // 3. Call NotebookLM API (using shared lib)
      await NotebookLM.addTextSource(lastNotebook.id, sourceTitle, selectedText);

      // 5. Increment usage counter is handled inside NotebookLM.addTextSource
      // await incrementUsage();

      // 4. Success Notification
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-48.png',
        title: 'Captured! ✓',
        message: `Text added to "${lastNotebook.title}"`,
      });

      console.log('✅ Text added successfully');
    } catch (error: any) {
      console.error('❌ Failed to send to NotebookLM:', error);

      let title = 'Error';
      let message = error.message || 'Failed to add text';

      // Check for LimitReachedError
      if (error.name === 'LimitReachedError') {
        title = '⚡ Daily Limit Reached';
        message = 'You have reached your daily limit. Upgrade to Pro for unlimited captures.';
      }

      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-48.png',
        title: title,
        message: message,
        buttons: error.name === 'LimitReachedError' ? [{ title: "Upgrade to Pro" }] : undefined
      });
    }
  }
});
