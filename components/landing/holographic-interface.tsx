"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Copy, FileText, Layout, MousePointer2, Sparkles } from "lucide-react";
import { useRef } from "react";

export function HolographicInterface() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for parallax
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-32 bg-neutral-50 overflow-hidden flex items-center justify-center min-h-[900px]"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Holographic Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[800px] h-[500px]"
      >
        {/* Layer 1: Base Glass Panel */}
        <motion.div
          style={{ transform: "translateZ(0px)" }}
          className="absolute inset-0 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-xl shadow-2xl shadow-indigo-500/10"
        >
          {/* Glossy reflection */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8 border-b border-indigo-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="text-indigo-400 text-sm font-mono tracking-widest">SYSTEM_READY</div>
            </div>
            
            <div className="flex-1 grid grid-cols-3 gap-6">
               <div className="col-span-2 space-y-4">
                  <div className="h-4 w-3/4 bg-indigo-50 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-indigo-50 rounded animate-pulse" />
                  <div className="h-32 w-full bg-white/50 rounded-xl border border-white/60 mt-8 p-4 shadow-sm">
                     <div className="flex items-center gap-3 mb-3 text-indigo-600">
                        <Sparkles className="size-4" />
                        <span className="text-sm font-medium">Processing Content...</span>
                     </div>
                     <div className="space-y-2">
                        <div className="h-2 w-full bg-indigo-100 rounded" />
                        <div className="h-2 w-5/6 bg-indigo-100 rounded" />
                        <div className="h-2 w-4/6 bg-indigo-100 rounded" />
                     </div>
                  </div>
               </div>
               <div className="col-span-1 bg-white/50 rounded-xl border border-white/60 p-4 space-y-3 shadow-sm">
                  <div className="size-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                     <Layout className="size-5 text-indigo-500" />
                  </div>
                  <div className="h-2 w-full bg-indigo-50 rounded" />
                  <div className="h-2 w-full bg-indigo-50 rounded" />
                  <div className="h-2 w-full bg-indigo-50 rounded" />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Layer 2: Floating UI Elements (Parallax) */}
        <motion.div
           style={{ transform: "translateZ(60px)" }}
           className="absolute top-20 right-[-50px] bg-white/80 backdrop-blur border border-white/60 p-4 rounded-xl shadow-xl shadow-indigo-500/10 flex items-center gap-4"
        >
             <div className="size-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Copy className="size-5 text-white" />
             </div>
             <div>
                <div className="text-indigo-500 text-xs font-semibold uppercase tracking-wider">Status</div>
                <div className="text-neutral-900 font-bold">Source Analyzed</div>
             </div>
        </motion.div>

        <motion.div
           style={{ transform: "translateZ(90px)" }}
           className="absolute bottom-10 left-[-40px] bg-white/80 backdrop-blur border border-white/60 p-4 rounded-xl shadow-xl shadow-purple-500/10 flex items-center gap-4"
        >
             <div className="size-10 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <FileText className="size-5 text-white" />
             </div>
             <div>
                <div className="text-purple-500 text-xs font-semibold uppercase tracking-wider">Output</div>
                <div className="text-neutral-900 font-bold">Concept Extracted</div>
             </div>
        </motion.div>

        {/* Layer 3: Mouse Cursor & Laser Pointer */}
        <motion.div
           style={{ 
               transform: "translateZ(120px)",
               x: useTransform(mouseX, (v) => v * -0.5),
               y: useTransform(mouseY, (v) => v * -0.5),
            }}
           className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
            <MousePointer2 className="size-8 text-black drop-shadow-xl fill-black/10" />
        </motion.div>
      </motion.div>
      
      {/* Title */}
      <div className="absolute bottom-20 text-center">
         <h3 className="text-neutral-400 text-xl font-light tracking-[0.2em] uppercase">Holographic Interface v2.0</h3>
      </div>
    </section>
  );
}
