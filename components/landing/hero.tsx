"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";

export function Hero() {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // 3D Tilt Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 15, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { damping: 15, stiffness: 100 });

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 pt-32 lg:pt-0">
      
      {/* Animated Background Gradients */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
            x: [0, -70, 0], 
            y: [0, 100, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        animate={{ 
            x: [0, 50, 0], 
            y: [0, 50, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-pink-500/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" 
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Text Content */}
          <div className="text-left space-y-8">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 backdrop-blur-md border border-indigo-100 shadow-sm text-sm text-indigo-600 mb-4"
            >
              <span className="flex size-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>v1.0 is now live on Chrome Store</span>
            </motion.div>

            <div className="space-y-4">
                <TextReveal 
                    text="Your Research." 
                    className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 leading-[1.1]" 
                    delay={0}
                />
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <span className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 inline-block">
                        Instantly Sync'd.
                    </span>
                </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed"
            >
              One click from any page to <span className="text-neutral-900 font-semibold">Google NotebookLM</span>.
              The fastest way to build your second brain.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton strength={0.2}>
                <Button 
                    size="lg" 
                    className="h-14 px-8 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-lg font-bold shadow-xl shadow-indigo-500/20 transition-all hover:scale-105 relative overflow-hidden group"
                    asChild
                >
                    <Link href="https://chromewebstore.google.com/detail/YOUR_REAL_EXTENSION_ID" target="_blank">
                        {/* Shimmer Effect */}
                        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shimmer" />
                        Add to Chrome - It's Free
                    </Link>
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <Button 
                    size="lg" 
                    variant="outline"
                    className="h-14 px-8 rounded-full border-neutral-200 bg-white/80 backdrop-blur-sm text-neutral-900 hover:bg-white text-lg transition-all hover:scale-105"
                    onClick={() => setShowDemoModal(true)}
                >
                    <Play className="mr-2 h-5 w-5 fill-neutral-900" />
                    Watch Demo
                </Button>
              </MagneticButton>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.4 }} 
               className="flex items-center gap-8 text-sm text-neutral-500"
            >
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Built for Researchers</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-neutral-400" />
                    <span>Free & Open Source</span>
                </div>
            </motion.div>
          </div>

          {/* Right - Screenshots with Parallax & Tilt */}
          <motion.div 
            style={{ y, rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Main Screenshot */}
            <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white/50 bg-white/80 backdrop-blur-xl rotate-[-2deg] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/screenshots/popup-main.png"
                alt="Send to NotebookLM Extension Interface"
                width={600}
                height={450}
                className="w-full h-auto"
                priority
              />
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse">
                Live on Chrome Store
              </div>
            </div>

            {/* Secondary Screenshot (floating with more parallax) */}
            <motion.div 
                style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
                className="absolute -bottom-10 -left-10 w-64 rounded-xl shadow-xl overflow-hidden border-4 border-white/50 bg-white/80 backdrop-blur-xl rotate-[5deg]"
            >
              <Image
                src="/screenshots/context-menu.png"
                alt="Right-click context menu"
                width={300}
                height={200}
                className="w-full h-auto"
              />
            </motion.div>

            {/* Decorative elements - Animated */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -z-10 -top-12 -right-12 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30" 
            />
          </motion.div>

        </div>
      </div>

      {/* Video Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90 border-none backdrop-blur-xl">
          <DialogTitle className="sr-only">Demo Video</DialogTitle>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center group">
              {/* Fallback Image / Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 animate-pulse" />
              <div className="text-center z-10">
                 <div className="bg-white/10 p-4 rounded-full mb-4 inline-flex backdrop-blur-sm border border-white/20">
                    <span className="text-4xl">🎥</span>
                 </div>
                 <p className="text-white/80 font-medium">Demo Video Placeholder</p>
                 <p className="text-white/50 text-sm mt-1">(Replace with your actual demo)</p>
              </div>
            </div>
        </DialogContent>
      </Dialog>

    </section>
  );
}
