"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Globe, Youtube, Zap } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    title: "Global Capture",
    description:
      "Works on any website, regardless of language or framework. If Chrome can render it, we can capture it.",
    icon: Globe,
    color: "bg-blue-500",
  },
  {
    title: "Instant YouTube",
    description:
      "Captures video transcripts and metadata instantly. Turn hour-long videos into searchable notes in seconds.",
    icon: Youtube,
    color: "bg-red-500",
  },
  {
    title: "Smart PDF Parsing",
    description:
      "Intelligent layout analysis preserves structure of complex PDFs, ensuring tables and headers remain intact.",
    icon: FileText,
    color: "bg-orange-500",
  },
  {
    title: "Lightning Fast",
    description:
      "Built on a high-performance Rust backend. Captures and processes heavy pages efficiently without slowing down Chrome.",
    icon: Zap,
    color: "bg-yellow-500",
  },
];

export function ParallaxFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="h-[300vh] bg-neutral-950 relative">
      {/* Sticky Header */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Ambient BG */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950" />

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute top-24 text-center z-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            Feature <span className="text-indigo-500">Deep Dive</span>
          </h2>
          <p className="text-neutral-400">Scroll to explore</p>
        </motion.div>

        {/* Cards Container */}
        <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center perspective-1000">
          {features.map((feature, i) => {
            // Calculate scroll range for each card
            const rangeStart = i * 0.25;
            return (
              <Card
                key={feature.title}
                feature={feature}
                progress={scrollYProgress}
                range={[rangeStart, 1]}
                index={i}
                total={features.length}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Card({ 
  feature, 
  progress, 
  range, 
  index, 
  total 
}: { 
  feature: typeof features[0]; 
  progress: any; 
  range: number[]; 
  index: number; 
  total: number; 
}) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.1], [0, 1]);
  const y = useTransform(progress, [range[0], range[0] + 0.2], [100, 0]);
  const scale = useTransform(progress, [range[0], range[0] + 0.2], [0.8, 1]);

  // Stacking effect: As next cards come in, this one moves up and shrinks slightly
  const exitStart = range[0] + 0.25;
  const exity = useTransform(progress, [exitStart, exitStart + 0.2], [0, -50]);
  const exitScale = useTransform(progress, [exitStart, exitStart + 0.2], [1, 0.9]);
  const exitOpacity = useTransform(progress, [exitStart, exitStart + 0.2], [1, 0]);

  // Combine transformations
  const transformY = useTransform(progress, (v: number) =>
    v > exitStart ? exity.get() : y.get()
  );

  const transformScale = useTransform(progress, (v: number) =>
    v > exitStart ? exitScale.get() : scale.get()
  );

  const transformOpacity = useTransform(progress, (v: number) =>
    v > exitStart ? exitOpacity.get() : opacity.get()
  );

  const finalY = index === total - 1 ? y : transformY;
  const finalScale = index === total - 1 ? scale : transformScale;
  const finalOpacity = index === total - 1 ? opacity : transformOpacity;

  // Z-index calculation to ensure stacking order
  const zIndex = index;

  return (
    <motion.div
      style={{
        opacity: finalOpacity,
        y: finalY,
        scale: finalScale,
        zIndex,
      }}
      className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl"
    >
      <div
        className={`size-16 rounded-2xl ${feature.color} flex items-center justify-center shadow-lg shadow-${feature.color}/20`}
      >
        <feature.icon className="size-8 text-white" />
      </div>

      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-white tracking-tight">
          {feature.title}
        </h3>
        <p className="text-neutral-400 text-lg leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="text-right text-neutral-600 font-mono text-sm">
        0{index + 1} / 0{total}
      </div>
    </motion.div>
  );
}
