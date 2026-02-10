"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Chen",
    role: "PhD Candidate",
    institution: "Stanford University",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    content: "I was spending 20+ minutes daily organizing research papers. Send to NotebookLM cut that to under 2 minutes. The PDF support is phenomenal - I can now capture entire papers with citations intact.",
    rating: 5,
  },
  {
    name: "Sarah Rodriguez",
    role: "Software Engineer",
    institution: "Google",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "As a developer, I read a lot of documentation. This extension is a game-changer. I can dump entire doc pages into NotebookLM and have AI summaries ready in seconds. Saves me 5+ hours per week.",
    rating: 5,
  },
  {
    name: "Marcus Thompson",
    role: "Master's Student",
    institution: "MIT",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    content: "Writing my thesis became so much easier. I capture 30-40 sources per week, and NotebookLM helps me cross-reference everything. The context menu for text selection is brilliant.",
    rating: 5,
  },
  {
    name: "Dr. Elena Volkov",
    role: "Senior Data Analyst",
    institution: "McKinsey & Company",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    content: "I use this daily for market research. The ability to quickly capture competitor websites, reports, and articles into organized notebooks has streamlined my entire workflow. Worth every penny of the Pro plan.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Product Manager",
    institution: "Stripe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content: "From 10 manual steps to 1 click. That's real productivity. I've recommended this to my entire team. The dark mode is a nice touch too.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden bg-white relative">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
            Loved by researchers worldwide
          </h2>
          <p className="text-xl text-neutral-600">
            See why thousands of knowledge workers trust Send to NotebookLM
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="relative">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-6 animate-marquee">
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <Card key={idx} className="min-w-[400px] max-w-[400px] bg-white border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                    <div className="flex items-start gap-4">
                        <div className="relative size-12 rounded-full overflow-hidden border border-neutral-100">
                            <Image
                                src={testimonial.avatar}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                        <CardTitle className="text-base text-neutral-900">{testimonial.name}</CardTitle>
                        <CardDescription className="text-sm text-neutral-500">
                            {testimonial.role}<br />
                            <span className="text-indigo-600 font-medium">{testimonial.institution}</span>
                        </CardDescription>
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent>
                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                        ))}
                    </div>
                    
                    <p className="text-sm text-neutral-600 leading-relaxed italic">
                        "{testimonial.content}"
                    </p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
