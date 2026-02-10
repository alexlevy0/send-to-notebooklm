"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(99, 102, 241, 0.15)" // Indigo-500 with low opacity
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Spotlight calculations (relative to card)
    const clientX = e.clientX - left;
    const clientY = e.clientY - top;
    
    // Tilt calculations (-0.5 to 0.5)
    const xPct = (e.clientX - left) / width - 0.5;
    const yPct = (e.clientY - top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    // We can use CSS variables for the spotlight position to avoid re-renders or complex motion value piping for gradients
    e.currentTarget.style.setProperty("--mouse-x", `${clientX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${clientY}px`);
  }

  // Tilt transforms
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]); // Inverse Y for tilt
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative transform-gpu transition-all duration-200 ease-out ${className}`}
    >
      {/* Card Content (Elevated for 3D effect) */}
      <div className="relative z-10 h-full">
        {children}
      </div>

      {/* Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 40%)`,
        }}
      />
      
      {/* Border Highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
             opacity: isHovered ? 1 : 0,
             background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(99, 102, 241, 0.4), transparent 40%)`,
             maskImage: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
             WebkitMaskImage: "linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)",
             maskComposite: "exclude",
             WebkitMaskComposite: "xor",
             padding: "1px", // Border width
        }} 
      />
    </motion.div>
  );
}
