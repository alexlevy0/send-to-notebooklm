"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50"
    >
      <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-neutral-900">
        <div className="size-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-sm text-white flex items-center justify-center">
          <Sparkles className="size-5 fill-white" />
        </div>
        <span>Send to NotebookLM</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
        <Link href="#features" className="hover:text-indigo-600 transition-colors">
          Features
        </Link>
        <Link
          href="#how-it-works"
          className="hover:text-indigo-600 transition-colors"
        >
          How it Works
        </Link>
        <Link href="#pricing" className="hover:text-indigo-600 transition-colors">
          Pricing
        </Link>
      </nav>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          className="hidden md:inline-flex text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
          asChild
        >
          <Link
            href="https://github.com/alexlevy0/send-to-notebooklm"
            target="_blank"
          >
            GitHub
          </Link>
        </Button>
        <Button className="bg-neutral-900 text-white hover:bg-neutral-800 font-semibold rounded-full px-6 shadow-xl shadow-indigo-500/10 transition-shadow">
          Add to Chrome
        </Button>
      </div>
    </motion.header>
  );
}
