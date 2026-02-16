"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Active Users", value: 2000, suffix: "+" },
  { label: "Notes Created", value: 15000, suffix: "+" },
  { label: "Hours Saved", value: 500, suffix: "+" },
];

export function Stats() {
  return (
    <section className="py-12 bg-white border-y border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index }: { stat: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
  });

  const displayValue = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(),
  );

  useEffect(() => {
    if (isInView) {
      spring.set(stat.value);
    }
  }, [isInView, spring, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center justify-center text-center p-4 hover:bg-neutral-50/50 transition-colors rounded-2xl group cursor-default"
    >
      <div className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 mb-2 flex items-center group-hover:scale-110 transition-transform duration-300 origin-center">
        <motion.span>{displayValue}</motion.span>
        <span>{stat.suffix}</span>
      </div>
      <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
        {stat.label}
      </span>
    </motion.div>
  );
}
