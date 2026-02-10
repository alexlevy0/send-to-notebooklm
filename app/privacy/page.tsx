import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Send to NotebookLM',
  description: 'Privacy Policy for the Send to NotebookLM Chrome Extension.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Introduction</h2>
      <p>
        "Send to NotebookLM" ("we", "our", or "us") is a Chrome Extension designed to help users save web content to their Google NotebookLM notebooks. We prioritize your privacy and are committed to protecting it.
      </p>

      <h2>2. Data Collection and Usage</h2>
      <p>
        <strong>We do not collect, store, or sell your personal data.</strong>
      </p>
      <p>
        Here is how we handle data:
      </p>
      <ul>
        <li>
          <strong>Authentication:</strong> We use your existing Google session cookies (specifically for <code>notebooklm.google.com</code>) solely to authenticate requests to the NotebookLM API on your behalf. These cookies never leave your browser for any other purpose and are not stored on our servers.
        </li>
        <li>
          <strong>Web Content:</strong> When you choose to save a page, the URL and title of that page are sent directly from your browser to Google's NotebookLM service. We do not track your browsing history.
        </li>
        <li>
          <strong>Local Preferences:</strong> We use Chrome's local storage to save your settings, such as the last notebook you selected, to improve your user experience.
        </li>
      </ul>

      <h2>3. Third-Party Services</h2>
      <p>
        The extension communicates with the following third-party services:
      </p>
      <ul>
        <li>
          <strong>Google NotebookLM:</strong> To fetch your notebooks and add new sources.
        </li>
        <li>
          <strong>Supabase:</strong> To verify your "Pro" subscription status (if applicable).
        </li>
        <li>
          <strong>Stripe:</strong> To process payments for the "Pro" version (if applicable).
        </li>
      </ul>

      <h2>4. Changes to This Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us via the support link on the Chrome Web Store or at our dedicated support email.
      </p>
    </div>
  );
}
