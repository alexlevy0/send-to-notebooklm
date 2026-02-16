"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Active Users", value: "2,000+" },
  { label: "Notes Created", value: "15,000+" },
  { label: "Hours Saved", value: "500+" },
];

export function Stats() {
  return (
    <section className="py-12 bg-white border-y border-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center p-4 hover:bg-neutral-50/50 transition-colors rounded-2xl"
            >
              <span className="text-4xl md:text-5xl font-black tracking-tight text-neutral-900 mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-widest">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
