"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How strong the magnetic pull is (default: 0.5)
}

export function MagneticButton({ children, className, strength = 0.5 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();

    const center = { x: left + width / 2, y: top + height / 2 };
    
    // Calculate distance from center
    const dX = clientX - center.x;
    const dY = clientY - center.y;

    x.set(dX * strength);
    y.set(dY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseX, y: mouseY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
