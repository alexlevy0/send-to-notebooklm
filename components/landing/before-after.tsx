"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Copy,
  FileText,
  MousePointer,
  XCircle,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax and Fade animations
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  const oldWayX = useTransform(scrollYProgress, [0.1, 0.5], [-50, 0]);
  const oldWayOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  const newWayX = useTransform(scrollYProgress, [0.1, 0.5], [50, 0]);
  const newWayOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-32 bg-neutral-50/50 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          style={{ opacity, scale, y }}
          className="text-center mb-24 space-y-6"
        >
          <Badge
            variant="secondary"
            className="mb-2 bg-indigo-100 text-indigo-700 border-indigo-200 px-4 py-1.5 text-sm font-semibold rounded-full"
          >
            Workflow Transformation
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900">
            Chaos vs. <span className="text-indigo-600">Clarity</span>
          </h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            See how Send to NotebookLM streamlines your research process from a
            messy manual workflow to a single click.
          </p>
        </motion.div>

        {/* Comparison Graphic */}
        <div className="relative grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Connector Arrow (Desktop) - Animated */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <motion.div
              animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-full p-4 shadow-xl border border-neutral-200/50 text-neutral-400">
                <ArrowRight className="size-8" />
              </div>
            </motion.div>
          </div>

          {/* OLD WAY: The Cluttered Stack */}
          <motion.div
            style={{ x: oldWayX, opacity: oldWayOpacity }}
            className="group relative flex flex-col items-center"
          >
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-neutral-500 flex items-center justify-center gap-2 mb-2">
                <XCircle className="size-6 text-red-500" /> The Old Way
              </h3>
              <p className="text-neutral-400">Manual, slow, and distracting.</p>
            </div>

            {/* The Stack */}
            <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center">
              {/* Card 3 (Bottom) */}
              <motion.div
                className="absolute w-full bg-white p-6 rounded-2xl shadow-md border border-neutral-200 rotate-[-6deg] opacity-60 scale-90 top-12"
                whileHover={{ rotate: -8, scale: 0.92 }}
              >
                <div className="flex items-center gap-3 text-neutral-400 mb-4 opacity-50">
                  <FileText className="size-5" />
                  <span className="font-semibold">Find Notebook</span>
                </div>
                <div className="h-2 w-3/4 bg-neutral-100 rounded mb-2" />
                <div className="h-2 w-1/2 bg-neutral-100 rounded" />
              </motion.div>

              {/* Card 2 (Middle) */}
              <motion.div
                className="absolute w-full bg-white p-6 rounded-2xl shadow-lg border border-neutral-200 rotate-[3deg] opacity-80 scale-95 top-0"
                whileHover={{ rotate: 5, scale: 0.97 }}
              >
                <div className="flex items-center gap-3 text-neutral-500 mb-4 opacity-70">
                  <Copy className="size-5" />
                  <span className="font-semibold">Copy & Paste URL</span>
                </div>
                <div className="h-10 w-full bg-neutral-50 border border-neutral-100 rounded mb-2 flex items-center px-3 text-xs text-neutral-300">
                  https://...
                </div>
              </motion.div>

              {/* Card 1 (Top) */}
              <motion.div
                className="absolute w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100 rotate-[-2deg] z-10"
                whileHover={{ rotate: 0, scale: 1.02 }}
              >
                <div className="flex items-center gap-3 text-red-900 mb-6">
                  <MousePointer className="size-6 text-red-500" />
                  <span className="font-bold text-lg">
                    Manual Context Switching
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-neutral-600 border-b border-neutral-50 pb-2">
                    <span>Steps required</span>
                    <span className="font-bold text-red-500">6+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-600 border-b border-neutral-50 pb-2">
                    <span>Time taken</span>
                    <span className="font-bold text-red-500">~45s</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span>Cognitive load</span>
                    <span className="font-bold text-red-500">High</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* NEW WAY: The Floating Orb */}
          <motion.div
            style={{ x: newWayX, opacity: newWayOpacity }}
            className="group relative flex flex-col items-center"
          >
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-bold text-indigo-900 flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="size-6 text-indigo-600" /> The New Way
              </h3>
              <p className="text-indigo-600/70">
                Instant, magical, and focused.
              </p>
            </div>

            <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />

              {/* Floating Card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl shadow-indigo-500/30 border border-white/50 z-10"
              >
                {/* Magic Sparkles */}
                <motion.div
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-6 -right-6 text-4xl"
                >
                  ✨
                </motion.div>

                <div className="flex flex-col items-center justify-center py-8">
                  <div className="size-24 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl shadow-lg flex items-center justify-center mb-6 text-white transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                    <Zap className="size-12 fill-white" />
                  </div>

                  <h4 className="text-2xl font-black text-indigo-950 mb-2">
                    One Click.
                  </h4>
                  <p className="text-indigo-600 font-medium mb-8">
                    Done in 3 seconds.
                  </p>

                  <div className="w-full bg-indigo-50 rounded-xl p-4 flex items-center justify-between border border-indigo-100">
                    <div className="flex items-center gap-2 text-indigo-900 font-medium">
                      <Clock className="size-4 text-indigo-600" />
                      <span>Time Saved</span>
                    </div>
                    <span className="bg-white px-2 py-1 rounded-md text-sm font-bold text-indigo-600 shadow-sm border border-indigo-100">
                      93%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
