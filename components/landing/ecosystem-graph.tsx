"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function EcosystemGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const nodes = [
    { id: "main", x: 50, y: 50, size: 80, label: "NotebookLM", type: "hub" },
    { id: "pdf", x: 20, y: 30, size: 50, label: "PDF", type: "source" },
    { id: "yt", x: 80, y: 30, size: 50, label: "YouTube", type: "source" },
    { id: "web", x: 20, y: 70, size: 50, label: "Web", type: "source" },
    { id: "doc", x: 80, y: 70, size: 50, label: "G-Doc", type: "source" },
  ];

  return (
    <section
      className="py-32 bg-white relative overflow-hidden"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 tracking-tight mb-6">
            Connect Your <span className="text-indigo-600">Universe</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            All your fragmented sources, united in one intelligent graph.
            Interact with the ecosystem below.
          </p>
        </div>

        <div className="relative w-full max-w-4xl mx-auto h-[500px] border border-neutral-100 rounded-[3rem] bg-neutral-50/50 backdrop-blur-sm shadow-inner overflow-hidden">
          {/* Grid Lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes
              .filter((n) => n.type === "source")
              .map((node, i) => (
                <motion.line
                  key={i}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2="50%"
                  y2="50%"
                  stroke="#e0e7ff"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <MagneticNode
              key={node.id}
              node={node}
              parentBounds={containerRef}
              mouseX={mousePosition.x}
              mouseY={mousePosition.y}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MagneticNode({ node, parentBounds, mouseX, mouseY }: any) {
  // Magnetic Pull Effect
  // In a real implementation we'd use physics, but simple distance lerp works for "fake" magnetic

  // Default position (percentage to px simplified for demo)
  // NOTE: This simple version relies on relative positioning.
  // Ideally we'd map percentages to actual pixels based on container width.

  const isHub = node.type === "hub";

  return (
    <motion.div
      className={`absolute flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 ${isHub ? "bg-indigo-600 text-white z-20" : "bg-white border border-neutral-200 text-neutral-600 z-10 hover:border-indigo-300 hover:text-indigo-600"}`}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: node.size,
        height: node.size,
        x: "-50%",
        y: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", bounce: 0.5, delay: isHub ? 0 : 0.2 }}
    >
      <span className={`text-xs font-bold ${isHub ? "text-sm" : ""}`}>
        {node.label}
      </span>

      {/* Pulse for Hub */}
      {isHub && (
        <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping" />
      )}
    </motion.div>
  );
}
