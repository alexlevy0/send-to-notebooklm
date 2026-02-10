# Chrome Web Store Listing - Send to NotebookLM

## 🎯 Single Purpose
**The sole purpose of this extension is to allow users to quickly save the current web page content into a selected Google NotebookLM notebook.**

---

## 📝 Store Fields

### Extension Name
`Send to NotebookLM`

### Summary (Short Description) - Max 132 chars
**Save articles, PDFs, and web pages directly to your Google NotebookLM notebooks with one click.**
*(Current: 96 chars)*

### Detailed Description
Boost your research productivity with "Send to NotebookLM".

Stop manually copying and pasting URLs. This extension provides a seamless bridge between your browser and Google NotebookLM.

**Core Feature:**
*   **One-Click Capture:** Instantly send the current tab's URL to any of your existing notebooks.

**How it works:**
1.  Open the extension on any web page.
2.  Select your target notebook from the list.
3.  Click to save. The source is immediately added to your NotebookLM.

**Key Benefits:**
*   ⚡️ **Fast:** No need to switch tabs or open NotebookLM manually.
*   🔍 **Searchable:** Filter your notebooks by name to find the right one instantly.
*   🔒 **Secure:** Works directly with your browser session; no personal data is collected.

**Perfect for:**
*   Researchers gathering sources.
*   Students collecting study materials.
*   Professionals archiving industry news.

*_This extension is an independent tool and is not officially affiliated with Google._*

---

### Category
Productivity

### Privacy Policy (Simple Draft)
*This extension does not collect, store, or transmit any personal user data. Authentication cookies are used solely to communicate with the NotebookLM API on your behalf directly from your browser.*

### Permissions Justification
**cookies:**
> Used to access the active session on `notebooklm.google.com`. This allows the extension to authenticate requests (like fetching notebooks and adding sources) using the user's existing login session, ensuring a seamless experience without requiring a separate login. We only access cookies for the `notebooklm.google.com` domain.

**activeTab:**
> Used to capture the title and URL of the current page when the user opens the extension, or to grab the page content when "Send to Notebook" is clicked. This data is sent directly to NotebookLM and is not stored elsewhere.

**storage:**
> Used to save user preferences, such as the "Last Selected Notebook", locally in the browser.

**notifications:**
> Used to display a brief success message ("Captured!") to the user after a link has been successfully sent to NotebookLM.

**contextMenus:**
> Used to add a "Send to NotebookLM" option to the right-click menu. This allows users to select specific text on a webpage and send only that selection to their default notebook, rather than the entire page URL.

**Host Permissions (notebooklm.google.com):**
> The extension needs to communicate directly with the NotebookLM API (`https://notebooklm.google.com/*`) to list the user's notebooks and add new sources to them. This communication happens client-side, using the user's active session.
