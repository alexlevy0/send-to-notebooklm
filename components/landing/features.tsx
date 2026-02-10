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
    <section id="features" className="py-32 px-6 bg-white relative overflow-hidden">
      
       {/* Ambient Background - Subtle Touch */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-50/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[100px]" />
       </div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900"
          >
            Built for the modern <br />{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Knowledge Worker
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            Simplify your information diet. Stop drowning in bookmarks and start
            building your second brain with precision.
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
        <SpotlightCard className="h-full rounded-[2rem] border border-neutral-200/60 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className="p-10 h-full flex flex-col items-start gap-6">
                <div className="size-14 rounded-2xl bg-indigo-50/80 border border-indigo-100/50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                    <Icon className="size-7 text-indigo-600 transition-colors group-hover:text-indigo-700" />
                </div>

                <div className="space-y-3 relative z-10">
                    <h3 className="text-2xl font-bold text-neutral-900 tracking-tight group-hover:text-indigo-700 transition-colors duration-300">{title}</h3>
                    <p className="text-neutral-500 text-base leading-relaxed">
                    {description}
                    </p>
                </div>

                {/* Decorative Pattern in Card - More subtle */}
                <div className="absolute -bottom-6 -right-6 p-6 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
                    <Icon className="size-40 -rotate-12" />
                </div>
            </div>
        </SpotlightCard>
    </motion.div>
  );
}
