"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronRight,
  GraduationCap,
  Microscope,
} from "lucide-react";
import { useState } from "react";

const useCases = [
  {
    id: "students",
    icon: GraduationCap,
    title: "Students",
    description:
      "Turn clutter into clarity. Capture lecture notes, articles, and research papers instantly into NotebookLM for smarter studying.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    className: "md:col-span-2",
  },
  {
    id: "researchers",
    icon: Microscope,
    title: "Researchers",
    description:
      "Build your knowledge base faster. Send journals, data sheets, and documentation directly to your source collection.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    className: "md:col-span-1",
  },
  {
    id: "professionals",
    icon: Briefcase,
    title: "Professionals",
    description:
      "Prepare for meetings and projects effortlessly. Curate industry news, reports, and competitor analysis.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    className: "md:col-span-3",
  },
];

export function UseCases() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900"
          >
            Built for <span className="text-indigo-600">Knowledge Workers</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600"
          >
            Whether you're studying for finals or leading a research team, we
            speed up your workflow.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase) => (
            <motion.div
              layout
              key={useCase.id}
              onHoverStart={() => setActiveId(useCase.id)}
              onHoverEnd={() => setActiveId(null)}
              className={`group relative p-8 rounded-3xl border border-neutral-200 bg-white hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 overflow-hidden cursor-default ${useCase.className}`}
              style={{
                // Subtle scale effect on hover
                zIndex: activeId === useCase.id ? 10 : 1,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-neutral-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl ${useCase.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300`}
                  >
                    <useCase.icon className={`size-7 ${useCase.color}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-indigo-900 transition-colors">
                    {useCase.title}
                  </h3>

                  <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-600 transition-colors">
                    {useCase.description}
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: activeId === useCase.id ? 1 : 0.5,
                    x: activeId === useCase.id ? 0 : -10,
                  }}
                  className="flex items-center text-sm font-semibold text-indigo-600 mt-6"
                >
                  Explore Use Case{" "}
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
