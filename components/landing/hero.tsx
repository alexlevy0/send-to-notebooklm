"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-6 pt-20">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-pink-100/40 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm text-sm text-indigo-600 mb-4"
        >
          <span className="flex size-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>v1.0 is now live on Chrome Store</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-neutral-900 pb-4"
        >
          Your Research. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 inline-block">
            Instantly Sync'd.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
        >
          Stop switching tabs. Send articles, PDFs, and insights directly to
          <span className="text-neutral-900 font-semibold"> Google NotebookLM </span>
          with a single click. The fastest way to build your second brain.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Button
            size="lg"
            className="h-14 px-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-lg font-bold shadow-xl shadow-indigo-500/10 transition-all hover:scale-105"
          >
            Add to Chrome - It's Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 rounded-full border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 text-lg transition-all hover:scale-105"
          >
            Watch Demo <ArrowRight className="ml-2 size-5" />
          </Button>
        </motion.div>

        {/* Social Proof / Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-12 text-sm text-neutral-500 flex items-center justify-center gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-8 rounded-full bg-neutral-200 border border-white"
                />
              ))}
            </div>
            <span>Trusted by 100+ researchers</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <Star className="size-4 fill-yellow-400 text-yellow-400" />
            <span className="text-neutral-900 font-medium ml-2">5.0 on Web Store</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
