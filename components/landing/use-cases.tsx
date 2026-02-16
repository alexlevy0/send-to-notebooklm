"use client";

import { motion } from "framer-motion";

import {
  Briefcase,
  ChevronRight,
  GraduationCap,
  Microscope,
} from "lucide-react";

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Turn clutter into clarity. Capture lecture notes, articles, and research papers instantly into NotebookLM for smarter studying.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    borderColor: "border-blue-100",
    hoverBorder: "hover:border-blue-200",
    hoverShadow: "hover:shadow-blue-500/10",
  },
  {
    icon: Microscope,
    title: "Researchers",
    description:
      "Build your knowledge base faster. Send journals, data sheets, and documentation directly to your source collection without breaking flow.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    borderColor: "border-purple-100",
    hoverBorder: "hover:border-purple-200",
    hoverShadow: "hover:shadow-purple-500/10",
  },
  {
    icon: Briefcase,
    title: "Professionals",
    description:
      "Prepare for meetings and projects effortlessly. Curate industry news, reports, and competitor analysis into actionable insights.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    borderColor: "border-emerald-100",
    hoverBorder: "hover:border-emerald-200",
    hoverShadow: "hover:shadow-emerald-500/10",
  },
];

export function UseCases() {
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

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-8 rounded-3xl border ${useCase.borderColor} bg-white transition-all duration-300 ${useCase.hoverBorder} hover:shadow-xl ${useCase.hoverShadow}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${useCase.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300`}
              >
                <useCase.icon className={`size-7 ${useCase.color}`} />
              </div>

              <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                {useCase.title}
              </h3>

              <p className="text-neutral-500 leading-relaxed mb-6">
                {useCase.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors">
                Learn more{" "}
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
