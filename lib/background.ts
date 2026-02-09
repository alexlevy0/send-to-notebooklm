import { NotebookLM } from "./notebooklm/api";

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

      console.log('Adding to notebook:', lastNotebook);

      // 2. Prepare data
      const selectedText = info.selectionText || "";
      const pageTitle = tab?.title || 'Untitled';
      const sourceTitle = `Selection from ${pageTitle}`;

      // 3. Call NotebookLM API (using shared lib)
      await NotebookLM.addTextSource(lastNotebook.id, sourceTitle, selectedText);

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

      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon-48.png',
        title: 'Error',
        message: error.message || 'Failed to add text',
      });
    }
  }
});
