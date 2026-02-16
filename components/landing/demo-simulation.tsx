"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Check,
  FileText,
  Globe,
  Image,
  Image as ImageIcon,
  Sparkles,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";

export function DemoSimulation() {
  const [status, setStatus] = useState<"idle" | "capturing" | "saved">("idle");
  const controls = useAnimation();
  const [typedUrl, setTypedUrl] = useState("");
  const fullUrl = "https://arxiv.org/abs/2310.02345";

  // Typing effect on mount
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedUrl(fullUrl.slice(0, i));
      i++;
      if (i > fullUrl.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handleCapture = async () => {
    if (status !== "idle") return;
    setStatus("capturing");

    // Simulate network delay and particle animation duration
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStatus("saved");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900 mb-6">
          See it in <span className="text-indigo-600">Action</span>
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Experience the speed. Click the extension to see how we instantly
          bridge the gap between web and notebook.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto h-[600px] bg-neutral-100 rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Browser Toolbar simulation */}
        <div className="bg-white border-b border-neutral-200 p-4 flex items-center gap-4">
          <div className="flex gap-2">
            <div className="size-3 rounded-full bg-red-400/80" />
            <div className="size-3 rounded-full bg-yellow-400/80" />
            <div className="size-3 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 bg-neutral-100/50 rounded-lg h-8 flex items-center px-4 text-sm text-neutral-500 font-medium font-mono overflow-hidden whitespace-nowrap">
            {typedUrl}
            <span className="animate-pulse w-0.5 h-4 bg-indigo-500 ml-1 inline-block align-middle" />
          </div>
          {/* The Magic Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCapture}
              className={`size-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${status === "idle" ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30" : "bg-green-100 text-green-600"}`}
            >
              {status === "idle" && <Sparkles className="size-5" />}
              {status === "capturing" && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="size-5 border-2 border-indigo-600 border-t-transparent rounded-full"
                />
              )}
              {status === "saved" && <Check className="size-5" />}
            </motion.button>

            {/* Tooltip hint */}
            {status === "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-14 right-0 bg-neutral-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-20"
              >
                Click me!
                <div className="absolute -top-1 right-3 size-2 bg-neutral-900 rotate-45" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Browser Content */}
        <div className="relative flex-1 bg-white p-8 md:p-12 overflow-hidden flex gap-12">
          {/* The Web Page Source */}
          <div className="flex-1 bg-neutral-50 rounded-xl border border-neutral-100 p-8 shadow-sm relative group transition-all duration-300 hover:shadow-md">
            <div className="h-6 w-3/4 bg-neutral-200 rounded mb-6" />
            <div className="space-y-3">
              <div className="h-3 w-full bg-neutral-100 rounded" />
              <div className="h-3 w-5/6 bg-neutral-100 rounded" />
              <div className="h-3 w-4/6 bg-neutral-100 rounded" />
              <div className="h-3 w-full bg-neutral-100 rounded" />
              <div className="h-3 w-3/4 bg-neutral-100 rounded" />
            </div>
            <div className="mt-8 flex gap-4">
              <div className="h-24 w-1/3 bg-neutral-200 rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-3 w-full bg-neutral-100 rounded" />
                <div className="h-3 w-full bg-neutral-100 rounded" />
                <div className="h-3 w-2/3 bg-neutral-100 rounded" />
              </div>
            </div>

            {/* Flying Particles */}
            {status === "capturing" && (
              <>
                {/* Source Icons instead of dots */}
                <FlyingIcon
                  icon={FileText}
                  delay={0}
                  color="text-red-500"
                  bg="bg-red-100"
                />
                <FlyingIcon
                  icon={Youtube}
                  delay={0.2}
                  color="text-red-600"
                  bg="bg-red-50"
                />
                <FlyingIcon
                  icon={Image}
                  delay={0.4}
                  color="text-blue-500"
                  bg="bg-blue-100"
                />
                <FlyingIcon
                  icon={Globe}
                  delay={0.6}
                  color="text-green-500"
                  bg="bg-green-100"
                />

                {/* Smaller Particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                    animate={{
                      x: 400 + Math.random() * 50, // Move to right
                      y: -50 + Math.random() * 100, // Scatter
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "backIn",
                    }}
                    className="absolute top-1/2 left-1/2 size-2 bg-indigo-400 rounded-full z-20"
                  />
                ))}
              </>
            )}
          </div>

          {/* Notebook Side (Destination) */}
          <div className="flex-1 bg-white rounded-xl border-2 border-dashed border-indigo-100 p-8 flex flex-col items-center justify-center relative transition-colors duration-300 hover:border-indigo-200">
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="h-2 w-16 bg-neutral-100 rounded-full" />
            </div>

            <div
              className={`size-32 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 ${status === "saved" ? "bg-indigo-600 shadow-indigo-500/50 shadow-2xl scale-110 rotate-3" : "bg-indigo-50 text-indigo-200"}`}
            >
              <FileText
                className={`size-12 transition-all duration-500 ${status === "saved" ? "text-white" : "text-indigo-200"}`}
              />
            </div>

            <h3
              className={`text-xl font-bold transition-colors duration-300 ${status === "saved" ? "text-indigo-900" : "text-neutral-300"}`}
            >
              {status === "saved" ? "Source Added!" : "Waiting for Source..."}
            </h3>

            {status === "saved" && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mt-4 flex gap-2"
              >
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded shadow-sm border border-green-200">
                  Processed
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded shadow-sm border border-blue-200">
                  Indexed
                </span>
              </motion.div>
            )}
          </div>

          {/* Connection Line */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div
              className={`rounded-full p-2 border transition-all duration-300 ${status === "capturing" ? "bg-indigo-50 border-indigo-200 shadow-lg scale-110" : "bg-white border-neutral-200 shadow-sm"}`}
            >
              <ArrowRight
                className={`size-6 transition-colors duration-300 ${status === "capturing" ? "text-indigo-600" : "text-neutral-300"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlyingIcon({ icon: Icon, delay, color, bg }: any) {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
      animate={{
        x: [0, 200, 450],
        y: [0, -50, 0],
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0],
        rotate: [0, 15, 45],
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }}
      className={`absolute top-1/2 left-1/2 size-10 rounded-xl ${bg} flex items-center justify-center shadow-xl border border-white z-30`}
    >
      <Icon className={`size-6 ${color}`} />
    </motion.div>
  );
}
