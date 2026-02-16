"use client";

import { type MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const paragraph =
  "We believe the web is full of brilliance — scattered across tabs, bookmarks, and forgotten links. Send to NotebookLM captures that brilliance instantly, transforming chaos into structured knowledge that your AI can actually understand and reason about.";

export function TextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = paragraph.split(" ");

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-white">
      {/* Sticky viewport — stays pinned while user scrolls */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Radial glow - adjusted for light theme */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-50 text-indigo-600 text-sm font-medium">
              Our Manifesto
            </span>
          </motion.div>

          {/* Text color changed to neutral-900 */}
          <p className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.3] md:leading-[1.2] lg:leading-[1.15] tracking-tight flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] text-neutral-900">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word key={`word-${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.1, 1]); // Lower start opacity for better contrast on white
  const blur = useTransform(progress, range, [8, 0]);
  const blurStr = useTransform(blur, (v: number) => `blur(${v}px)`);

  return (
    <motion.span
      style={{ opacity, filter: blurStr }}
      className="inline-block will-change-[opacity,filter] transition-none mr-[0.2em]"
    >
      {children}
    </motion.span>
  );
}
