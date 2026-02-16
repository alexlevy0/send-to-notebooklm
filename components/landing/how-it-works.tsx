"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, FileText, MousePointerClick } from "lucide-react";
import { useRef, useState } from "react";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 relative overflow-hidden bg-white"
    >
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative z-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Three steps to <span className="text-indigo-600">Supercharge</span>{" "}
            your reading
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            No complex setup. Just install and start capturing.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-12">
          {/* Animated Path (Desktop) */}
          <div className="absolute top-0 left-0 right-0 hidden md:block pointer-events-none z-0">
            <svg
              width="100%"
              height="100"
              viewBox="0 0 1000 100"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M 166 50 C 333 50, 333 50, 500 50 C 666 50, 666 50, 833 50"
                stroke="#e5e5e5"
                strokeWidth="2"
                strokeDasharray="10 10"
              />
              <motion.path
                d="M 166 50 C 333 50, 333 50, 500 50 C 666 50, 666 50, 833 50"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <StepCard
            number="01"
            title="Click extension"
            description="Navigate to any page and click the extension icon."
            icon={MousePointerClick}
            index={0}
            progress={scrollYProgress} // Pass progress to trigger active state
            threshold={0.2}
          />
          <StepCard
            number="02"
            title="Select content"
            description="Choose to save the full page or specific selection."
            icon={FileText}
            index={1}
            progress={scrollYProgress}
            threshold={0.5}
          />
          <StepCard
            number="03"
            title="Sync to Notebook"
            description="Content is instantly available in your notebook."
            icon={CheckCircle2}
            index={2}
            progress={scrollYProgress}
            threshold={0.8}
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  number,
  title,
  description,
  icon: Icon,
  index,
  progress,
  threshold,
}: any) {
  const [isActive, setIsActive] = useState(false);

  // Subscribe to scroll progress to toggle active state
  useMotionValueEvent(progress, "change", (latest: number) => {
    if (latest > threshold && !isActive) setIsActive(true);
    if (latest < threshold && isActive) setIsActive(false);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative flex flex-col items-center text-center space-y-6 z-10"
    >
      {/* Icon Circle */}
      <motion.div
        animate={{
          scale: isActive ? 1.1 : 1,
          borderColor: isActive
            ? "rgba(99, 102, 241, 0.5)"
            : "rgba(255, 255, 255, 1)",
        }}
        className="relative z-10 bg-white p-2 rounded-full border-4 shadow-xl transition-colors duration-500"
      >
        <motion.div
          animate={{
            backgroundColor: isActive ? "#eff6ff" : "#ffffff", // blue-50 : white
          }}
          className="size-20 rounded-full border border-indigo-100 flex items-center justify-center relative overflow-hidden group"
        >
          <Icon
            className={`size-8 relative z-10 transition-colors duration-300 ${isActive ? "text-indigo-600" : "text-neutral-400"}`}
          />

          {/* Active Glow */}
          <motion.div
            animate={{ opacity: isActive ? 1 : 0 }}
            className="absolute inset-0 bg-indigo-500/10"
          />
        </motion.div>

        {/* Number Badge */}
        <motion.div
          animate={{
            backgroundColor: isActive ? "#4f46e5" : "#171717",
            scale: isActive ? 1.2 : 1,
          }}
          className="absolute -top-2 -right-2 size-8 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white transition-colors duration-300"
        >
          {number}
        </motion.div>
      </motion.div>

      <div className="space-y-3 px-4">
        <h3
          className={`text-xl font-bold transition-colors duration-300 ${isActive ? "text-indigo-900" : "text-neutral-900"}`}
        >
          {title}
        </h3>
        <p className="text-neutral-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
