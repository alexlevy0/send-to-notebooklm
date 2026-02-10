"use client";

import { motion } from "framer-motion";
import { Globe, History, Lock, Zap, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const features = [
  {
    id: "instant-capture",
    title: "Instant Capture",
    description: "One click to save any article, PDF, or YouTube video to your notebook.",
    icon: Zap,
    className: "md:col-span-2",
  },
  {
    id: "secure-private",
    title: "Secure & Private",
    description: "Your data goes directly to Google. We don't store your content.",
    icon: Lock,
    className: "md:col-span-1",
  },
  {
    id: "direct-integration",
    title: "Direct Integration",
    description: "Your browsing history meets your second brain. Send content directly to specific notebooks without copy-pasting.",
    icon: History,
    className: "md:col-span-2",
  },
  {
    id: "visual-context",
    title: "Visual Context",
    description: "Preserves the link to the original source, allowing NotebookLM to process the content with full context.",
    icon: Sparkles,
    className: "md:col-span-1",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-neutral-50 relative overflow-hidden">
      
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px]" />
       </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900"
          >
            Built for the modern <br />{" "}
            <span className="text-indigo-600">Knowledge Worker</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-600 max-w-2xl mx-auto"
          >
            Simplify your information diet. Stop drowning in bookmarks and start
            building your second brain.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <BentoCard key={feature.id} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ title, description, icon: Icon, className, index }: any) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={className}
    >
        <SpotlightCard className="h-full rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden group">
            <div className="p-8 h-full flex flex-col items-start gap-4">
                <div className="size-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="size-6 text-indigo-600 transition-colors group-hover:text-indigo-700" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors duration-300">{title}</h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                    {description}
                    </p>
                </div>

                {/* Decorative Pattern in Card */}
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                    <Icon className="size-32 -rotate-12 translate-x-8 -translate-y-8" />
                </div>
            </div>
        </SpotlightCard>
    </motion.div>
  );
}
