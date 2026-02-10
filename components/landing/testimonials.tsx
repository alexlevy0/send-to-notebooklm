"use client";

"use client";

const testimonials = [
  {
    name: "Alex",
    role: "Researcher",
    text: "This extension saved me hours of copy-pasting. NotebookLM is useless without it.",
  },
  {
    name: "Sarah_Dev",
    role: "Engineer",
    text: "Finally, a way to dump documentation into NotebookLM instantly.",
  },
  {
    name: "Marcus",
    role: "Student",
    text: "Game changer for my thesis. The PDF capture is flawless.",
  },
  {
    name: "Elena",
    role: "Analyst",
    text: "I use this daily. It just works. The dark mode is a nice touch too.",
  },
  {
    name: "David",
    role: "Product Manager",
    text: "Workflow optimized. From 10 clicks to 1.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
      
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div 
                key={i}
                className="inline-block w-[350px] p-6 rounded-2xl bg-neutral-50 border border-neutral-200 shrink-0 whitespace-normal"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                    <div>
                        <div className="font-bold text-neutral-900">{t.name}</div>
                        <div className="text-xs text-neutral-500">{t.role}</div>
                    </div>
                </div>
                <p className="text-neutral-600 text-sm leading-relaxed">
                    "{t.text}"
                </p>
            </div>
        ))}
      </div>
      
    </section>
  );
}
