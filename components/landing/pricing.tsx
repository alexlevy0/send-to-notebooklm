"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CHROME_EXTENSION_URL } from "@/lib/extension-config";

const WAITLIST_URL = "https://tally.so/r/rjAejR";

const tiers = [
  {
    name: "Early Access",
    id: "tier-free",
    price: "€0",
    description: "Generous limits for all early adopters.",
    features: ["200 captures per day", "5,000 captures per month", "Standard Support", "All features included"],
    cta: "Add to Chrome — Free",
    href: CHROME_EXTENSION_URL,
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "€3",
    description: "Truly unlimited — coming soon.",
    features: [
      "Unlimited captures",
      "Priority Support",
      "Full Context Preservation",
      "Early Access to Features",
    ],
    cta: "Join Waitlist",
    href: WAITLIST_URL,
    featured: true,
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="py-24 px-6 relative bg-neutral-50 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">
             Pricing
          </Badge>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900"
          >
            Simple, Transparent <span className="text-indigo-600">Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-600 text-lg max-w-2xl mx-auto"
          >
            Start free with generous limits. Pro with truly unlimited captures is coming soon.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200"
          >
            <Zap className="size-4" />
            🎉 Early Access: All features are free during beta
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                tier.featured
                  ? "bg-neutral-900/95 backdrop-blur-xl border-neutral-800 shadow-2xl shadow-indigo-500/30 md:scale-110 md:-translate-y-4 z-10"
                  : "bg-white border-white/50 shadow-sm hover:shadow-md hover:border-neutral-200"
              }`}
            >
              {tier.featured && (
                <>
                  {/* Shimmer Border Effect */}
                  <div
                    className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50 mask-gradient animate-shimmer-border pointer-events-none"
                    style={{
                      maskImage:
                        "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Spotlight Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-purple-500/10 rounded-3xl pointer-events-none" />

                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-indigo-500/40 flex items-center gap-1.5">
                      <Sparkles className="size-3.5 fill-white" /> Coming Soon
                    </div>
                  </div>
                </>
              )}

              <div className="mb-6 space-y-2 relative z-10">
                <h3
                  className={`text-2xl font-bold ${tier.featured ? "text-white" : "text-neutral-900"}`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm ${tier.featured ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  {tier.description}
                </p>
              </div>

              <div className="mb-8 flex items-baseline gap-1 relative z-10">
                <span
                  className={`text-5xl font-black tracking-tighter ${tier.featured ? "text-white" : "text-neutral-900"}`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm font-medium ${tier.featured ? "text-neutral-400" : "text-neutral-500"}`}
                >
                  /month
                </span>
              </div>

              <ul className="mb-10 space-y-4 relative z-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-1 size-5 rounded-full flex items-center justify-center shrink-0 ${tier.featured ? "bg-indigo-500/20 text-indigo-400" : "bg-green-100 text-green-600"}`}
                    >
                      <Check className="size-3" />
                    </div>
                    <span
                      className={`text-sm font-medium ${tier.featured ? "text-neutral-200" : "text-neutral-600"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                className={`w-full rounded-full h-14 text-base font-bold shadow-lg transition-all hover:scale-[1.02] relative z-10 ${
                  tier.featured
                    ? "bg-white text-neutral-900 hover:bg-neutral-100 shadow-indigo-500/25"
                    : "bg-white border-2 border-neutral-100 text-neutral-900 hover:bg-neutral-50 hover:border-neutral-200 shadow-none"
                }`}
              >
                <a href={tier.href} target="_blank">
                  {tier.cta}
                </a>
              </Button>

              {tier.featured && (
                <p className="text-xs text-center text-neutral-500 mt-5 relative z-10 font-medium">
                  You&apos;ll be the first to know when Pro launches
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="text-center mt-12">
          <p className="text-neutral-500">
            Questions? Check our{" "}
            <a
              href="#faq"
              className="text-indigo-600 hover:underline font-medium"
            >
              FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
