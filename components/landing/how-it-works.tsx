"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MousePointerClick, FileText, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden bg-white">
      
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
                Three steps to <span className="text-indigo-600">Supercharge</span> your reading
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
                No complex setup. Just install and start capturing.
            </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-12">
            
          {/* Animated Beam (Desktop Horizontal) */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-neutral-100 hidden md:block rounded-full overflow-hidden">
             <motion.div 
                style={{ width: lineHeight }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
             />
          </div>

          <StepCard 
            number="01"
            title="Click extension"
            description="Navigate to any page and click the extension icon."
            icon={MousePointerClick}
            index={0}
          />
          <StepCard 
            number="02"
            title="Select content"
            description="Choose to save the full page or specific selection."
            icon={FileText}
            index={1}
          />
          <StepCard 
            number="03"
            title="Sync to Notebook"
            description="Content is instantly available in your notebook."
            icon={CheckCircle2}
            index={2}
          />

        </div>
      </div>
    </section>
  );
}

function StepCard({ number, title, description, icon: Icon, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col items-center text-center space-y-6"
    >
      {/* Icon Circle */}
      <div className="relative z-10 bg-white p-2 rounded-full border-4 border-white shadow-xl">
         <div className="size-20 rounded-full bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 flex items-center justify-center relative overflow-hidden group">
            <Icon className="size-8 text-indigo-600 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
         </div>
         
         {/* Number Badge */}
         <div className="absolute -top-2 -right-2 size-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
            {number}
         </div>
      </div>

      <div className="space-y-3 px-4">
        <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        <p className="text-neutral-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
