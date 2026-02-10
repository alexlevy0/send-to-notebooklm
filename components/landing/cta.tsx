"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/50 to-white pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 space-y-8 max-w-3xl"
      >
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900">
          Ready to supercharge your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Research Workflow?
          </span>
        </h2>
        
        <p className="text-lg text-neutral-600 max-w-xl mx-auto">
            Join thousands of researchers who have switched to a faster, smarter way of working.
        </p>

        <Button 
            size="lg" 
            className="h-16 px-10 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-xl font-bold shadow-xl shadow-indigo-500/20 transition-all hover:scale-105"
            asChild
        >
            <Link href="https://chromewebstore.google.com/detail/YOUR_REAL_EXTENSION_ID" target="_blank">
                <Sparkles className="mr-2 size-5" />
                Install Extension Now
            </Link>
        </Button>

        <p className="text-neutral-600 text-sm">
          Free forever for casual use. No credit card required.
        </p>
      </motion.div>
    </section>
  );
}
