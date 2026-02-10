"use client";

import { motion } from "framer-motion";
import { Globe, History, Lock, Zap, Sparkles } from "lucide-react";
import { useState } from "react";

const features = [
  {
    id: "instant-capture",
    title: "Instant Capture",
    description:
      "One click to save any article, PDF, or YouTube video to your notebook.",
    icon: Zap,
    className: "md:col-span-2",
  },

  {
    id: "secure-private",
    title: "Secure & Private",
    description:
      "Your data goes directly to Google. We don't store your content.",
    icon: Lock,
    className: "md:col-span-1",
  },
  {
    id: "direct-integration", // Changed ID
    title: "Direct Integration",
    description: "Your browsing history meets your second brain. Send content directly to specific notebooks without copy-pasting.",
    icon: History, // Reusing History icon, or could be a new one if specified
    className: "md:col-span-2", // Reusing original className, or could be a new one if specified
  },
  {
    id: "visual-context", // Kept ID
    title: "Visual Context",
    description: "Preserves the link to the original source, allowing NotebookLM to process the content with full context.",
    icon: Sparkles, // Changed icon to Sparkles
    className: "md:col-span-1", // Reusing original className
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-neutral-50">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900"
          >
            Built for the modern <br />{" "}
            <span className="text-indigo-600">Knowledge Worker</span>
          </motion.h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Simplify your information diet. Stop drowning in bookmarks and start
            building your second brain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <BentoCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ title, description, icon: Icon, className }: any) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 space-y-4 group ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.05), transparent 40%)`,
        }}
      />

      <div className="size-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
        <Icon className="size-6 text-indigo-600" />
      </div>

      <div className="space-y-2 relative z-10">
        <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        <p className="text-neutral-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
