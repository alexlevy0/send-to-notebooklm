"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Brain, Layers, Search, Zap } from "lucide-react";
import type { MouseEvent } from "react";

const features = [
  {
    title: "AI-Ready Format",
    description:
      "Content is automatically formatted for optimal RAG processing in NotebookLM.",
    icon: Brain,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Zero Friction",
    description: "No logins, no paywalls, just instant capture.",
    icon: Zap,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Context Aware",
    description: "Preserves metadata, authors, and original source links.",
    icon: Layers,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Smart De-duplication",
    description: "Prevents capturing the same source twice.",
    icon: Search,
    className: "md:col-span-2 md:row-span-1",
  },
];

export function BentoGrid() {
  return (
    <div className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-20 md:mb-32">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-8 leading-tight">
            Engineering <br/> <span className="text-indigo-600">Perfection</span>
          </h2>
          <p className="text-neutral-500 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed">
            Every interaction is crafted for speed, reliability, and delight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <BentoItem key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

function BentoItem({ title, description, icon: Icon, className }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`relative border border-neutral-200 bg-white rounded-3xl p-8 flex flex-col justify-between overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.1),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="size-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="size-6 text-neutral-900" />
        </div>
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative gradient blob */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
