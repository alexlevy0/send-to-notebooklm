"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-neutral-50 border-t border-neutral-100">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-neutral-600">
            Everything you need to know about Send to NotebookLM
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          
          <AccordionItem value="what-is" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              What is Send to NotebookLM?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              Send to NotebookLM is a Chrome extension that lets you capture web pages, articles, 
              PDFs, and YouTube videos directly into your Google NotebookLM notebooks with a single click. 
              It eliminates the manual copy-paste workflow and saves you time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="how-works" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              How does it work?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              After installing the extension, simply click the icon in your Chrome toolbar while viewing 
              any web page. Select your target NotebookLM notebook from the dropdown, and click to send. 
              The extension automatically captures the URL and sends it to NotebookLM. You can also 
              right-click selected text to send it instantly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="pdf-support" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              Does it work with PDFs and YouTube videos?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              Yes! The extension works with any URL that NotebookLM supports, including:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Web articles and blog posts</li>
                <li>PDFs (opened in Chrome or linked)</li>
                <li>YouTube videos</li>
                <li>Google Docs (if you have access)</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              Is my data private and secure?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              Absolutely. Your data goes directly from your browser to Google NotebookLM using Google's 
              official API. We don't store, process, or have access to the content you capture. The extension 
              is also <a href="https://github.com/alexlevy0/send-to-notebooklm" className="text-indigo-600 hover:underline">
              open source on GitHub</a>, so you can verify the code yourself.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="free-limits" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              What are the free tier limits?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              The free tier includes:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong>10 captures per day</strong> - Resets at midnight UTC</li>
                <li><strong>200 captures per month</strong> - Resets on the 1st of each month</li>
              </ul>
              This is more than enough for casual research. If you need more, upgrade to Pro for unlimited captures.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="difference-bookmarks" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              How is this different from browser bookmarks?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              Browser bookmarks just save links. Send to NotebookLM actually sends the full content 
              to NotebookLM, where it's indexed, searchable, and can be used for AI-powered summaries, 
              Q&A, and research. NotebookLM becomes your second brain, not just a link collection.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="undo" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              Can I undo a capture or delete sources?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              Yes! Once a source is sent to NotebookLM, you can manage it from your notebook. 
              Simply open the notebook in NotebookLM and delete any source you no longer need. 
              The extension sends sources but doesn't interfere with NotebookLM's management features.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="google-account" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              Do I need a Google account?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              Yes, you need to be logged into a Google account with access to Google NotebookLM. 
              The extension uses your existing Google session to authenticate with NotebookLM's API.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="support" className="bg-white rounded-lg px-6 border border-neutral-200">
            <AccordionTrigger className="text-left font-semibold text-neutral-900 hover:no-underline hover:text-indigo-600">
              How do I get support?
            </AccordionTrigger>
            <AccordionContent className="text-neutral-600">
              Free users can open issues on our <a href="https://github.com/alexlevy0/send-to-notebooklm/issues" 
              className="text-indigo-600 hover:underline">GitHub repository</a>. 
              Pro users get priority email support at <strong>support@send-to-notebooklm.com</strong> with guaranteed 
              24-hour response times.
            </AccordionContent>
          </AccordionItem>

        </Accordion>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-neutral-500 mb-4">
            Still have questions?
          </p>
          <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50" asChild>
            <a href="mailto:support@send-to-notebooklm.com">
              Contact Support
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
