"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-neutral-900">
            <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center">
              <Sparkles className="size-4 text-indigo-600" />
            </div>
            <span>Send to NotebookLM</span>
          </div>
          <p className="text-neutral-500 max-w-xs text-sm">
            The fastest way to capture and organize your research. Built for the
            future of knowledge work.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm text-neutral-500">
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="hover:text-indigo-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-indigo-600">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-indigo-600">
                  Pricing
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-indigo-600">
                  Changelog
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-indigo-600">
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="hover:text-indigo-600">
                  Terms
                </Link>
              </li> */}
               <li>
                <a href="mailto:legal@send-to-notebooklm.com" className="hover:text-indigo-600">
                  Legal Inquiries
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-900">Social</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/alexlevy0"
                  className="hover:text-indigo-600"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-indigo-600">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 mt-16 pt-8 text-center text-xs text-neutral-500">
        &copy; {new Date().getFullYear()} Send to NotebookLM. All rights
        reserved.
      </div>
    </footer>
  );
}
