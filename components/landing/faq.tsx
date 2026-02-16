"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    id: "what-is",
    question: "What is Send to NotebookLM?",
    answer:
      "Send to NotebookLM is a Chrome extension that lets you capture web pages, articles, PDFs, and YouTube videos directly into your Google NotebookLM notebooks with a single click. It eliminates the manual copy-paste workflow and saves you time.",
  },
  {
    id: "how-works",
    question: "How does it work?",
    answer:
      "After installing the extension, simply click the icon in your Chrome toolbar while viewing any web page. Select your target NotebookLM notebook from the dropdown, and click to send. The extension automatically captures the URL and sends it to NotebookLM.",
  },
  {
    id: "pdf-support",
    question: "Does it work with PDFs and YouTube?",
    answer:
      "Yes! The extension works with any URL that NotebookLM supports, including web articles, blog posts, PDFs (opened in Chrome or linked), YouTube videos, and Google Docs.",
  },
  {
    id: "privacy",
    question: "Is my data private and secure?",
    answer:
      "Absolutely. Your data goes directly from your browser to Google NotebookLM using Google's official API. We don't store, process, or have access to the content you capture. The project is open source on GitHub.",
  },
  {
    id: "free-limits",
    question: "What are the free tier limits?",
    answer:
      "The free tier includes 10 captures per day and 200 captures per month. This is more than enough for casual research. Pro upgrade for unlimited captures is coming soon.",
  },
  {
    id: "google-account",
    question: "Do I need a Google account?",
    answer:
      "Yes, you need to be logged into a Google account with access to Google NotebookLM. The extension uses your existing Google session to authenticate.",
  },
  {
    id: "difference-bookmarks",
    question: "How is this different from bookmarks?",
    answer:
      "Browser bookmarks just save links. We send the full content to NotebookLM, where it's indexed, searchable, and ready for AI analysis. It turns your reading list into a knowledge base.",
  },
  {
    id: "support",
    question: "How do I get support?",
    answer:
      "Free users can open issues on our GitHub repository. Pro users get priority email support with guaranteed response times.",
  },
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <section id="faq" className="py-32 bg-neutral-50 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <Badge variant="secondary" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Everything you need to know about supercharging your research
            workflow.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-neutral-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 pointer-events-none" />
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={faq.id}
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className={`group cursor-pointer rounded-3xl border transition-all duration-300 overflow-hidden relative ${
                  activeId === faq.id
                    ? "bg-white border-indigo-200 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/20"
                    : "bg-white/60 border-neutral-200 hover:bg-white hover:border-indigo-100 hover:shadow-lg"
                }`}
              >
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-start gap-4">
                    <h3
                      className={`text-lg font-bold transition-colors duration-300 ${
                        activeId === faq.id
                          ? "text-indigo-900"
                          : "text-neutral-700 group-hover:text-neutral-900"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    <div
                      className={`mt-1 shrink-0 bg-neutral-100 rounded-full p-1 transition-transform duration-300 ${activeId === faq.id ? "rotate-45 bg-indigo-100 text-indigo-600" : "group-hover:bg-neutral-200"}`}
                    >
                      <Plus className="size-4" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {activeId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-neutral-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredFaqs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-neutral-500">
              No questions found matching "{searchQuery}"
            </p>
            <Button
              variant="link"
              onClick={() => setSearchQuery("")}
              className="text-indigo-600 mt-2"
            >
              Clear search
            </Button>
          </motion.div>
        )}

        {/* CTA */}
        <div className="text-center mt-20">
          <p className="text-neutral-500 mb-6 font-medium">
            Still have questions? We're here to help.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            asChild
          >
            <a href="mailto:support@send-to-notebooklm.com">Contact Support</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
