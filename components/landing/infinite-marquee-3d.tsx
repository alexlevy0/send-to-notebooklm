"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FileText,
  Globe,
  Image as ImageIcon,
  Layers,
  Link as LinkIcon,
  MessageSquare,
  Mic,
  Newspaper,
  Video,
  Youtube,
} from "lucide-react";
import { useRef } from "react";

interface SourceItem {
  icon: LucideIcon;
  label: string;
  color: string;
}

const row1: SourceItem[] = [
  { icon: Youtube, label: "YouTube", color: "text-red-400" },
  { icon: FileText, label: "PDFs", color: "text-orange-400" },
  { icon: Globe, label: "Websites", color: "text-blue-400" },
  { icon: Newspaper, label: "Articles", color: "text-emerald-400" },
  { icon: BookOpen, label: "eBooks", color: "text-purple-400" },
  { icon: MessageSquare, label: "Threads", color: "text-sky-400" },
  { icon: Mic, label: "Podcasts", color: "text-pink-400" },
  { icon: LinkIcon, label: "URLs", color: "text-amber-400" },
];

const row2: SourceItem[] = [
  { icon: Video, label: "Videos", color: "text-rose-400" },
  { icon: Layers, label: "Slides", color: "text-violet-400" },
  { icon: ImageIcon, label: "Images", color: "text-teal-400" },
  { icon: Globe, label: "Docs", color: "text-indigo-400" },
  { icon: FileText, label: "Notes", color: "text-lime-400" },
  { icon: Newspaper, label: "Blogs", color: "text-cyan-400" },
  { icon: BookOpen, label: "Papers", color: "text-fuchsia-400" },
  { icon: MessageSquare, label: "Tweets", color: "text-yellow-400" },
];

export function InfiniteMarquee3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(
    useTransform(mouseY, [-300, 300], [5, -5]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-500, 500], [-5, 5]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
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
      className="relative py-32 overflow-hidden"
      style={{ perspective: 1200, backgroundColor: "#ffffff" }}
    >
      {/* Background glow - Light Mode */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(99,102,241,0.05),transparent)] pointer-events-none" />

      <div className="text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6"
        >
          Every Source.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            One Brain.
          </span>
        </motion.h2>
        <p className="text-neutral-500 text-xl max-w-2xl mx-auto">
          From YouTube videos to research papers — capture it all.
        </p>
      </div>

      {/* 3D Tilting Container */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative space-y-6"
      >
        <MarqueeRow
          items={[...row1, ...row1, ...row1]}
          direction="left"
          speed={30}
        />
        <MarqueeRow
          items={[...row2, ...row2, ...row2]}
          direction="right"
          speed={25}
        />
        <MarqueeRow
          items={[...row1, ...row1, ...row1]}
          direction="left"
          speed={35}
        />
      </motion.div>

      {/* Edge fades - Light */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: SourceItem[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{
          x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-4"
      >
        {items.map((item, i) => (
          <SourceCard key={`${item.label}-${i}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function SourceCard({ item }: { item: SourceItem }) {
  const Icon = item.icon;
  return (
    <div className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 cursor-default shrink-0">
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/50 transition-all duration-500" />

      <Icon
        className={`size-6 ${item.color} group-hover:scale-110 transition-transform duration-300 relative z-10`}
      />
      <span className="text-sm font-medium text-neutral-500 group-hover:text-neutral-900 transition-colors duration-300 relative z-10 whitespace-nowrap">
        {item.label}
      </span>
      {/* Light Theme Card */}
    </div>
  );
}
