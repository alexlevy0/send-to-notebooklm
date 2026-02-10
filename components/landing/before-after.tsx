"use client";

import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BeforeAfter() {
  return (
    <section className="py-20 bg-neutral-50 border-t border-neutral-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="mb-4">Time Savings</Badge>
          <h2 className="text-4xl font-bold tracking-tight text-neutral-900">
            From 45 seconds to 3 seconds
          </h2>
          <p className="text-xl text-neutral-600">
            See the dramatic difference in your workflow
          </p>
        </div>

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* BEFORE */}
          <div className="bg-white rounded-2xl p-8 border-2 border-red-100 relative overflow-hidden shadow-sm">
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Old Way
            </div>

            <h3 className="text-2xl font-bold mb-6 text-red-900">
              Before Send to NotebookLM
            </h3>

            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Copy the URL</p>
                  <p className="text-sm text-neutral-500">Select and copy the page URL</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Switch tabs</p>
                  <p className="text-sm text-neutral-500">Navigate to NotebookLM</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Open notebook</p>
                  <p className="text-sm text-neutral-500">Find and open your target notebook</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Add source</p>
                  <p className="text-sm text-neutral-500">Click "Add Source" button</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Paste URL</p>
                  <p className="text-sm text-neutral-500">Paste and confirm the URL</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                  6
                </span>
                <div>
                  <p className="font-medium text-neutral-900">Wait for processing</p>
                  <p className="text-sm text-neutral-500">Wait for NotebookLM to process</p>
                </div>
              </li>
            </ol>

            {/* Time Badge */}
            <div className="mt-8 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-red-900 font-medium">Total Time:</span>
                <Badge variant="destructive" className="text-lg font-bold">
                  ~45 seconds
                </Badge>
              </div>
              <p className="text-xs text-red-700 mt-2">
                × 20 captures/day = 15 minutes wasted daily
              </p>
            </div>
          </div>

          {/* AFTER */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-8 border-2 border-indigo-200 relative overflow-hidden shadow-lg">
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              New Way ✨
            </div>

            <h3 className="text-2xl font-bold mb-6 text-indigo-900">
              With Send to NotebookLM
            </h3>

            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow">
                  1
                </span>
                <div>
                  <p className="font-medium text-lg text-neutral-900">Click extension icon</p>
                  <p className="text-sm text-indigo-700 font-medium">That's it. Done. ✓</p>
                </div>
              </li>
            </ol>

            {/* Spacer to align with BEFORE */}
            <div className="h-[320px] flex items-center justify-center">
              <div className="text-center">
                <CheckCircle className="h-24 w-24 text-indigo-600 mx-auto mb-4" />
                <p className="text-indigo-900 font-bold text-2xl">
                  Automated & Instant
                </p>
                <p className="text-indigo-700 mt-2 text-lg">
                  No manual steps. No context switching.
                </p>
              </div>
            </div>

            {/* Time Badge */}
            <div className="mt-8 p-4 bg-indigo-100 rounded-lg border-2 border-indigo-300 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-900 font-medium">Total Time:</span>
                <Badge className="bg-indigo-600 text-lg font-bold hover:bg-indigo-700">
                  ~3 seconds
                </Badge>
              </div>
              <p className="text-xs text-indigo-800 mt-2 font-medium">
                × 20 captures/day = 1 minute. Save 14 minutes daily! 🎉
              </p>
            </div>
          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl border border-neutral-100 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">93%</div>
            <p className="text-sm text-neutral-500">Time Saved</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-neutral-100 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">1 click</div>
            <p className="text-sm text-neutral-500">vs 6 steps</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-neutral-100 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">14 min</div>
            <p className="text-sm text-neutral-500">Saved daily</p>
          </div>
        </div>

      </div>
    </section>
  );
}
