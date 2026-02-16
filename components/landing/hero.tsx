"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Play, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { LiquidBackground } from "@/components/landing/liquid-background";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";
import { CHROME_EXTENSION_URL } from "@/lib/extension-config";

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
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    damping: 15,
    stiffness: 100,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    damping: 15,
    stiffness: 100,
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] flex flex-col justify-center overflow-hidden px-6 pt-32 lg:pt-0"
    >
      <LiquidBackground />

      {/* Animated Background Gradients & Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/40 via-white to-white pointer-events-none" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-gradient-to-br from-indigo-300/30 to-purple-300/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text Content */}
          <div className="text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/50 shadow-sm text-sm text-neutral-600 mb-6"
            >
              <span className="flex size-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="font-medium">v1.0 is now live</span>
            </motion.div>

            <div className="space-y-6">
              <TextReveal
                text="Your Research."
                className="text-6xl md:text-8xl font-black tracking-tighter text-neutral-900 leading-[0.95]"
                delay={0}
              />
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <span className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 inline-block pb-4">
                  Instantly Sync'd.
                </span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xl md:text-2xl text-neutral-600 max-w-xl leading-relaxed font-normal tracking-tight"
            >
              One click from any page to{" "}
              <span className="text-neutral-900 font-semibold border-b-2 border-indigo-100">
                NotebookLM
              </span>
              . The fastest way to build your second brain.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <MagneticButton strength={0.3}>
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 text-lg font-bold shadow-2xl shadow-indigo-500/30 transition-all hover:scale-105 relative overflow-hidden group"
                  asChild
                >
                  <Link href={CHROME_EXTENSION_URL} target="_blank">
                    {/* Shimmer Effect */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shimmer" />
                    <span className="relative z-10">Add to Chrome</span>
                  </Link>
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.3}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-10 rounded-full border-neutral-200 bg-white/50 backdrop-blur-xl text-neutral-900 hover:bg-white text-lg font-medium transition-all hover:scale-105"
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
              className="flex items-center gap-8 text-sm text-neutral-500 pt-4"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-neutral-400" />
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
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.2, type: "spring" }}
            className="relative hidden lg:block pt-10"
          >
            {/* Glow Behind Image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/20 rounded-full blur-[100px] -z-10" />

            {/* Main Screenshot Container */}
            <div className="relative group perspective-1000">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden border border-white/20 bg-neutral-900/5 backdrop-blur-sm p-2 transition-all duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.3)]">
                <div className="relative rounded-xl overflow-hidden bg-white shadow-inner">
                  <Image
                    src="/screenshots/popup-main.png"
                    alt="Send to NotebookLM Extension Interface"
                    width={600}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  {/* Subtle Glint */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
              </div>

              {/* Live Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-md text-neutral-900 px-4 py-2 rounded-2xl text-sm font-bold shadow-xl border border-white/50 flex items-center gap-2"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Live on Store
              </motion.div>
            </div>

            {/* Secondary Screenshot (floating) */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
              className="absolute -bottom-16 -left-12 w-64 rounded-xl shadow-2xl overflow-hidden border-2 border-white/80 bg-white p-1"
            >
              <Image
                src="/screenshots/context-menu.png"
                alt="Right-click context menu"
                width={300}
                height={200}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Demo Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90 border-none backdrop-blur-xl">
          <DialogTitle className="sr-only">Demo Video</DialogTitle>
          <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center group">
            <div className="text-center z-10">
              <div className="bg-white/10 p-4 rounded-full mb-4 inline-flex backdrop-blur-sm border border-white/20 animate-pulse">
                <Play className="size-8 text-white fill-white" />
              </div>
              <p className="text-white/80 font-medium tracking-wide">
                Watch the 30s walkthrough
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
