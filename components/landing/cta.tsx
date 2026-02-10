"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-neutral-900 border-t border-neutral-800">
      
      {/* 3D Grid Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          
           {/* Floating Particles */}
           <motion.div 
              animate={{ 
                  y: [0, -100],
                  opacity: [0, 1, 0]
              }}
              transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatDelay: 1
              }}
              className="absolute top-1/2 left-1/4 w-1 h-1 bg-indigo-500 rounded-full shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]"
           />
            <motion.div 
              animate={{ 
                  y: [0, -150],
                  opacity: [0, 1, 0]
              }}
              transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: 2
              }}
              className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_2px_rgba(168,85,247,0.5)]"
           />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
        >
             <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
                Ready to transform your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                    Research Workflow?
                </span>
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
                Join thousands of researchers who have already switched to the new way of reading and thinking.
            </p>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
            >
                <Button 
                    size="lg" 
                    className="h-16 px-10 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-xl font-bold shadow-2xl shadow-indigo-500/50 relative overflow-hidden group"
                    asChild
                >
                    <Link href="https://chromewebstore.google.com/detail/YOUR_REAL_EXTENSION_ID" target="_blank">
                        <span className="relative z-10 flex items-center gap-2">
                             <Sparkles className="size-5 text-indigo-600" />
                             Get Started for Free
                        </span>
                        
                        {/* Pulse Ring */}
                        <span className="absolute inset-0 rounded-full ring-2 ring-white/50 animate-ping opacity-75" />
                    </Link>
                </Button>
            </motion.div>
            
            <p className="text-sm text-neutral-500 mt-6">
                No credit card required • Less than 1 minute setup
            </p>
        </motion.div>
      </div>
    </section>
  );
}
