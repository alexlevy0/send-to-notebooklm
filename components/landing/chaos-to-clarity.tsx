"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FileText, Image as ImageIcon, StickyNote, Video } from "lucide-react";
import { useRef } from "react";

export function ChaosToClarity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform chaos to order
  // Cards start scattered and rotate/move to center
  const card1X = useTransform(scrollYProgress, [0, 0.8], [-300, 0]);
  const card1Y = useTransform(scrollYProgress, [0, 0.8], [-200, 0]);
  const card1R = useTransform(scrollYProgress, [0, 0.8], [-45, 0]);
  const card1O = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const card2X = useTransform(scrollYProgress, [0, 0.8], [300, 0]);
  const card2Y = useTransform(scrollYProgress, [0, 0.8], [-150, 0]);
  const card2R = useTransform(scrollYProgress, [0, 0.8], [30, 0]);
  const card2O = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const card3X = useTransform(scrollYProgress, [0, 0.8], [-250, 0]);
  const card3Y = useTransform(scrollYProgress, [0, 0.8], [200, 0]);
  const card3R = useTransform(scrollYProgress, [0, 0.8], [-20, 0]);
  const card3O = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  const card4X = useTransform(scrollYProgress, [0, 0.8], [250, 0]);
  const card4Y = useTransform(scrollYProgress, [0, 0.8], [250, 0]);
  const card4R = useTransform(scrollYProgress, [0, 0.8], [45, 0]);
  const card4O = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Notebook appearance
  const notebookScale = useTransform(scrollYProgress, [0.6, 1], [0.5, 1]);
  const notebookOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-neutral-50">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
        <div className="text-center mb-12 relative z-50">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-4"
          >
            From{" "}
            <span className="text-neutral-400 line-through decoration-red-500">
              Chaos
            </span>{" "}
            to <span className="text-indigo-600">Clarity</span>
          </motion.h2>
          <p className="text-xl text-neutral-600">Scroll to see it happen</p>
        </div>

        <div className="relative size-[400px] md:size-[600px] flex items-center justify-center">
          {/* Center Notebook - The Result */}
          <motion.div
            style={{ scale: notebookScale, opacity: notebookOpacity }}
            className="absolute z-20 size-48 md:size-64 bg-white rounded-3xl shadow-2xl flex items-center justify-center border border-neutral-200"
          >
            <div className="text-center space-y-4">
              <div className="size-20 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
                <StickyNote className="size-10 text-white" />
              </div>
              <div className="font-bold text-neutral-900 text-xl">
                Organized Notes
              </div>
            </div>
          </motion.div>

          {/* Scattered Cards */}
          <FloatingCard
            x={card1X}
            y={card1Y}
            rotate={card1R}
            opacity={card1O}
            icon={FileText}
            text="Research PDF"
            color="bg-red-50"
            iconColor="text-red-500"
          />
          <FloatingCard
            x={card2X}
            y={card2Y}
            rotate={card2R}
            opacity={card2O}
            icon={Video}
            text="YouTube Video"
            color="bg-blue-50"
            iconColor="text-blue-500"
          />
          <FloatingCard
            x={card3X}
            y={card3Y}
            rotate={card3R}
            opacity={card3O}
            icon={ImageIcon}
            text="Infographic"
            color="bg-green-50"
            iconColor="text-green-500"
          />
          <FloatingCard
            x={card4X}
            y={card4Y}
            rotate={card4R}
            opacity={card4O}
            icon={FileText}
            text="Blog Post"
            color="bg-orange-50"
            iconColor="text-orange-500"
          />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({
  x,
  y,
  rotate,
  opacity,
  icon: Icon,
  text,
  color,
  iconColor,
}: any) {
  return (
    <motion.div
      style={{ x, y, rotate, opacity }}
      className={`absolute size-32 md:size-40 ${color} rounded-2xl shadow-lg border border-white/50 flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-10`}
    >
      <Icon className={`size-8 md:size-10 ${iconColor}`} />
      <span className="text-xs md:text-sm font-semibold text-neutral-600">
        {text}
      </span>
    </motion.div>
  );
}
