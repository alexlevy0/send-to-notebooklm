"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    content: "Absolutely a game changer! I use NotebookLM for all my research now, and this extension makes getting data into it seamless. 10/10.",
    author: "Sarah J.",
    role: "PhD Candidate",
    stars: 5,
  },
  {
    content: "The one-click save is incredible. No more copy-pasting URLs or downloading PDFs just to re-upload them. Essential tool.",
    author: "David K.",
    role: "Product Manager",
    stars: 5,
  },
  {
    content: "Simple, fast, and does exactly what it says. The 'Save Selection' feature is particularly useful for grabbing specific quotes.",
    author: "Elena R.",
    role: "Journalist",
    stars: 5,
  },
    {
    content: "I didn't realize how much time I was wasting manually importing sources until I started using this. It's instant now.",
    author: "Marcus T.",
    role: "Legal Researcher",
    stars: 5,
  },
  {
    content: "Clean interface, fast performance, and it just works. NotebookLM is powerful, but this extension makes it accessible.",
    author: "Priya L.",
    role: "Student",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-neutral-50 text-neutral-900 overflow-hidden relative">
      {/* Background Gradients - Light Mode */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-300/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-sm font-medium mb-6"
          >
            <Star className="size-4 fill-indigo-600" />
            Loved by Researchers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Don't just take our word for it
          </motion.h2>
        </div>

      </div>

      {/* Marquee Effect Container */}
      <div className="relative z-10 fade-mask-x w-full">
        <div className="flex overflow-hidden group">
          <motion.div
            className="flex gap-6 animate-marquee"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.author}-${i}`}
                className="flex-shrink-0 w-[350px] md:w-[400px] p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300"
               >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={`star-${i}`}
                      className="size-4 text-orange-400 fill-orange-400"
                    />
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-sm font-bold text-white shadow-md shadow-indigo-500/20">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{t.author}</div>
                    <div className="text-sm text-neutral-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
