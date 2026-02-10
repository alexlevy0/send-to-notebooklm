"use client";

import { motion } from "framer-motion";
import { Check, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: "€0",
    description: "Perfect for casual researchers.",
    features: [
      "10 captures per day",
      "Standard Support",
      "Basic Context",
    ],
    cta: "Add to Chrome",
    href: "https://chromewebstore.google.com/detail/YOUR_REAL_EXTENSION_ID",
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    price: "€3",
    description: "For power users & researchers.",
    features: [
        "Unlimited captures",
        "Priority Support",
        "Full Context Preservation",
        "Early Access to Features",
    ],
    cta: "Upgrade to Pro",
    href: "https://buy.stripe.com/test_28E28s8BcgZd2Td4Z6cfK00", // Test link
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative bg-neutral-50 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
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
            Start free forever. Upgrade when you need unlimited captures.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }} // Scale effect on hover
              className={`relative rounded-3xl p-8 shadow-sm border ${
                tier.featured
                  ? "bg-neutral-900 text-white border-neutral-800 shadow-2xl shadow-indigo-500/20"
                  : "bg-white text-neutral-900 border-neutral-200"
              }`}
            >
              {tier.featured && (
                <>
                    {/* Animated Gradient Background for Pro Card (Whole Card) */}
                    <motion.div 
                        animate={{ 
                            backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{ 
                            duration: 5, 
                            repeat: Infinity, 
                            repeatType: "reverse",
                            ease: "linear"
                        }}
                        className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,55,125,0.2)_50%,rgba(236,72,153,0.2)_75%,transparent_100%)] bg-[length:200%_200%] pointer-events-none rounded-3xl"
                    />
                    
                     <div className="absolute top-0 right-0 p-6">
                         <div className="relative inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-400/30">
                            <Star className="size-3 fill-indigo-400" /> Most Popular
                         </div>
                    </div>
                </>
              )}

              <div className="mb-6 space-y-2 relative z-10">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                    {tier.name}
                    {tier.featured && <Sparkles className="h-5 w-5 text-indigo-400" />}
                </h3>
                <p className={`text-sm ${tier.featured ? "text-neutral-400" : "text-neutral-500"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="mb-6 flex items-baseline gap-1 relative z-10">
                <span className="text-5xl font-bold tracking-tight">{tier.price}</span>
                <span className={`text-sm ${tier.featured ? "text-neutral-400" : "text-neutral-500"}`}>/ month</span>
              </div>

              <ul className="mb-8 space-y-4 relative z-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`size-5 shrink-0 ${tier.featured ? "text-indigo-400" : "text-green-600"}`} />
                    <span className={`text-sm ${tier.featured ? "text-neutral-300" : "text-neutral-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={tier.featured ? "default" : "outline"}
                className={`w-full rounded-full h-12 text-base font-semibold transition-all relative z-10 ${
                    tier.featured 
                    ? "bg-white text-neutral-900 hover:bg-neutral-100" 
                    : "border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <a href={tier.href} target="_blank">
                  {tier.cta}
                </a>
              </Button>
              
              {tier.featured && (
                  <p className="text-xs text-center text-neutral-500 mt-4 relative z-10">
                    Cancel anytime. No questions asked.
                  </p>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* FAQ Teaser */}
        <div className="text-center mt-12">
          <p className="text-neutral-500">
            Questions? Check our <a href="#faq" className="text-indigo-600 hover:underline font-medium">FAQ</a>
          </p>
        </div>

      </div>
    </section>
  );
}
