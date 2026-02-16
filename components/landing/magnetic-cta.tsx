"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

export function MagneticCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for magnetic pull
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const buttonX = useSpring(useTransform(mouseX, (v) => v * 0.15), springConfig);
  const buttonY = useSpring(useTransform(mouseY, (v) => v * 0.15), springConfig);

  // Subtle tilt for the whole section
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
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
      className="relative py-32 md:py-48 bg-white overflow-hidden flex items-center justify-center min-h-[80vh]"
      style={{ perspective: 1000 }}
    >
      {/* Animated Aurora Blobs - Adjusted for Light Mode */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 mix-blend-multiply">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -120, 80, 0],
            y: [0, 100, -40, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-300 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 60, -100, 0],
            y: [0, -60, 80, 0],
            scale: [1, 1.1, 0.85, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-200 rounded-full blur-[150px]"
        />
      </div>

      {/* Grid pattern overlay - Darker for visibility on white */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Content with 3D tilt */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 text-center space-y-12 max-w-4xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-neutral-900 mb-6">
            Ready to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
              Supercharge
            </span>
            <br />
            Your Brain?
          </h2>
          <p className="text-neutral-600 text-xl md:text-2xl max-w-2xl mx-auto">
            Join thousands of knowledge workers using AI to organize their world.
          </p>
        </motion.div>

        {/* Magnetic Button */}
        <motion.a
          ref={buttonRef}
          href="https://chromewebstore.google.com/detail/send-to-notebooklm/kfcojpjgochcgolmfinmpjpagaegamko"
          target="_blank"
          rel="noopener noreferrer"
          style={{ x: buttonX, y: buttonY }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="relative inline-flex items-center gap-4 px-12 py-6 rounded-2xl text-xl md:text-2xl font-bold text-white group cursor-pointer overflow-hidden shadow-2xl shadow-indigo-500/30"
        >
          {/* Button background with glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </div>

          {/* Button content */}
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles className="size-6" />
            Install Extension
            <ArrowRight className="size-6 group-hover:translate-x-1 transition-transform" />
          </span>
        </motion.a>

        {/* Floating particles around the button - Darker for contrast */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.sin(i) * 10, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              className="absolute size-2 bg-indigo-500 rounded-full blur-[1px]"
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + Math.sin(i * 2) * 20}%`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Vignette - Lightened */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,white_100%)] pointer-events-none opacity-50" />
    </section>
  );
}
