"use client";

import { motion } from "framer-motion";
import { ArrowRight, Chrome, Library, Send } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 relative overflow-hidden bg-white">
        
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent hidden md:block" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 relative z-10">
        
        <Step 
          number="01" 
          title="Install Extension" 
          description="Add to Chrome in seconds. Pin it to your toolbar for instant access."
          icon={Chrome}
          delay={0.2}
        />
        
        <Step 
          number="02" 
          title="Browse & Capture" 
          description="Navigate to any page, PDF or video. Click the icon to prepare the source."
          icon={Library}
          delay={0.4}
        />

        <Step 
          number="03" 
          title="Send to Notebook" 
          description="Select your target notebook. We handle the formatting and sync automatically."
          icon={Send}
          delay={0.6}
        />

      </div>
    </section>
  );
}

function Step({ number, title, description, icon: Icon, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative flex flex-col items-center text-center space-y-6"
    >
      <div className="size-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center shadow-xl shadow-indigo-500/10 relative group">
        <div className="absolute inset-0 bg-indigo-50 blur-xl group-hover:bg-indigo-100 transition-all rounded-full opacity-0 group-hover:opacity-100" />
        <Icon className="size-8 text-indigo-600 relative z-10" />
        <div className="absolute -top-3 -right-3 size-8 rounded-full bg-indigo-600 border-4 border-white flex items-center justify-center text-xs font-bold text-white">
            {number}
        </div>
      </div>

      <div className="space-y-2 px-4">
        <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
        <p className="text-neutral-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
