"use client";

import { Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-neutral-50 border-t border-neutral-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">Pricing</Badge>
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Start free forever. Upgrade when you need unlimited captures.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* FREE TIER */}
          <Card className="relative overflow-hidden border-2 border-neutral-100 shadow-sm hover:shadow-lg transition-shadow bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-neutral-900">Free</CardTitle>
              <CardDescription className="text-base text-neutral-500">
                Perfect for casual researchers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-5xl font-bold text-neutral-900">€0</span>
                <span className="text-neutral-500 ml-2">/ month</span>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900">10 captures per day</strong>
                    <p className="text-sm text-neutral-500">Enough for daily research</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900">200 captures per month</strong>
                    <p className="text-sm text-neutral-500">Generous monthly allowance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700">All core features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Context menu integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Auto-save last notebook</span>
                </li>
              </ul>

              <Button 
                className="w-full mt-8 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-200" 
                size="lg"
                asChild
              >
                <a href="https://chromewebstore.google.com/detail/send-to-notebooklm/..." target="_blank">
                  Get Started Free
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* PRO TIER */}
          <Card className="relative overflow-hidden border-2 border-indigo-500 hover:shadow-2xl transition-shadow bg-white">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-indigo-600 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
              Most Popular
            </div>
            
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-neutral-900">
                Pro
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </CardTitle>
              <CardDescription className="text-base text-neutral-500">
                For power users and professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-5xl font-bold text-neutral-900">€3</span>
                <span className="text-neutral-500 ml-2">/ month</span>
                <div className="text-sm text-indigo-600 font-medium mt-1">
                  or €30/year (save 17%)
                </div>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-indigo-600">Unlimited captures</strong>
                    <p className="text-sm text-neutral-500">No daily or monthly limits</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Everything in Free, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Early access to new features</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-neutral-700">Pro badge in extension</span>
                </li>
              </ul>

              <Button 
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20" 
                size="lg"
                asChild
              >
                <a href="https://buy.stripe.com/..." target="_blank">
                  Upgrade to Pro
                </a>
              </Button>

              <p className="text-xs text-center text-neutral-400 mt-4">
                Cancel anytime. No questions asked.
              </p>
            </CardContent>
          </Card>

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
