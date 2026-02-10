"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Play, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Hero() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-20 lg:pt-0">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/60 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-100/60 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-pink-100/40 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Text Content */}
          <div className="text-left space-y-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-sm text-sm text-indigo-600 mb-4"
            >
              <span className="flex size-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>v1.0 is now live on Chrome Store</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 leading-[1.1]"
            >
              Your Research. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 inline-block">
                 Instantly Sync'd.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed"
            >
              Stop switching tabs. Send articles, PDFs, and insights directly to 
              <span className="text-neutral-900 font-semibold"> Google NotebookLM </span> 
              with a single click. The fastest way to build your second brain.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="h-14 px-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-lg font-bold shadow-xl shadow-indigo-500/10 transition-all hover:scale-105"
                asChild
              >
                <Link href="https://chromewebstore.google.com/detail/send-to-notebooklm/..." target="_blank">
                  Add to Chrome - It's Free
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-14 px-8 rounded-full border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 text-lg transition-all hover:scale-105"
                onClick={() => setShowDemoModal(true)}
              >
                <Play className="mr-2 h-5 w-5 fill-neutral-900" />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.7 }} 
               className="flex items-center gap-8 text-sm text-neutral-500"
            >
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>100+ researchers</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>5.0 on Chrome Store</span>
                </div>
            </motion.div>
          </div>

          {/* Right - Screenshots */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            {/* Main Screenshot */}
            <div className="relative rounded-xl shadow-2xl overflow-hidden border-4 border-white/50 bg-white rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <Image
                src="/screenshots/popup-main.png"
                alt="Send to NotebookLM Extension Interface"
                width={600}
                height={450}
                className="w-full h-auto"
                priority
              />
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                Live on Chrome Store
              </div>
            </div>

            {/* Secondary Screenshot (floating) */}
            <div className="absolute -bottom-10 -left-10 w-64 rounded-lg shadow-xl overflow-hidden border-4 border-white bg-white rotate-[5deg] hover:rotate-[2deg] transition-transform duration-500">
              <Image
                src="/screenshots/context-menu.png"
                alt="Right-click context menu"
                width={300}
                height={200}
                className="w-full h-auto"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 -top-12 -right-12 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30" />
            <div className="absolute -z-10 -bottom-12 -left-12 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30" />
          </motion.div>

        </div>
      </div>

      {/* Video Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
          <DialogTitle className="sr-only">Demo Video</DialogTitle>
          <div className="aspect-video bg-neutral-900 flex items-center justify-center">
            {/* Placeholder for now - User can replace with YouTube embed */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>

    </section>
  );
}
