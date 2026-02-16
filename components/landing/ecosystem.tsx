"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Database,
  FileCheck,
  FileText,
  Link as LinkIcon,
  Youtube,
} from "lucide-react";

export function Ecosystem() {

  return (
    <div className="relative overflow-hidden w-full h-full flex flex-col justify-center items-center bg-neutral-50">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

      <div className="relative z-10 p-12 w-full max-w-2xl mx-auto">
        <div className="text-center mb-16 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900"
          >
            The Ultimate{" "}
            <span className="text-indigo-600">Knowledge Pipeline</span>
          </motion.h2>
          <p className="text-neutral-500 text-xl font-medium max-w-lg mx-auto">
            Connect every corner of the web directly to your second brain.
          </p>
        </div>

        {/* Ecosystem Visualization */}
        <div className="relative w-full aspect-square flex items-center justify-center">
          {/* Center Node (NotebookLM) */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-20 size-32 md:size-40 bg-white rounded-full shadow-[0_20px_50px_-12px_rgba(99,102,241,0.3)] flex items-center justify-center border-8 border-indigo-50"
          >
            <div className="absolute inset-0 bg-indigo-50/50 rounded-full animate-pulse" />
            <Database className="size-12 md:size-16 text-indigo-600" />
          </motion.div>

          {/* Orbiting Nodes */}
          <OrbitingNode
            icon={Youtube}
            label="YouTube"
            angle={0}
            delay={0}
            color="text-red-600"
            bgColor="bg-white"
            borderColor="border-neutral-100"
          />
          <OrbitingNode
            icon={FileText}
            label="PDFs"
            angle={72}
            delay={1}
            color="text-orange-600"
            bgColor="bg-white"
            borderColor="border-neutral-100"
          />
          <OrbitingNode
            icon={LinkIcon}
            label="Articles"
            angle={144}
            delay={2}
            color="text-green-600"
            bgColor="bg-white"
            borderColor="border-neutral-100"
          />
          <OrbitingNode
            icon={FileCheck}
            label="Google Docs"
            angle={216}
            delay={3}
            color="text-blue-600"
            bgColor="bg-white"
            borderColor="border-neutral-100"
          />
          <OrbitingNode
            icon={ArrowRight}
            label="Web Pages"
            angle={288}
            delay={4}
            color="text-purple-600"
            bgColor="bg-white"
            borderColor="border-neutral-100"
          />

          {/* Connecting Lines & Data Packets */}
          <ConnectionLine angle={0} />
          <ConnectionLine angle={72} />
          <ConnectionLine angle={144} />
          <ConnectionLine angle={216} />
          <ConnectionLine angle={288} />
        </div>
      </div>
    </div>
  );
}

function OrbitingNode({
  icon: Icon,
  label,
  angle,
  delay,
  color,
  bgColor,
  borderColor,
}: any) {
  // Calculate position based on angle (radius 240px for larger layout)
  const radius = 240;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.1, type: "spring" }}
      className={`absolute size-16 md:size-20 rounded-2xl ${bgColor} ${borderColor} border-2 flex flex-col items-center justify-center shadow-sm z-20 hover:scale-110 transition-transform cursor-pointer group bg-white`}
      style={{
        x,
        y,
      }}
    >
      <Icon className={`size-6 md:size-8 ${color} mb-1`} />
      <span className="text-[10px] md:text-xs font-semibold text-neutral-500 group-hover:text-neutral-900 transition-colors">
        {label}
      </span>
    </motion.div>
  );
}

function ConnectionLine({ angle }: { angle: number }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 w-[240px] h-[2px] bg-neutral-200 origin-left -z-10"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <motion.div
        className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
        animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
    </div>
  );
}
