"use client";

import { BentoGrid } from "@/components/landing/bento-grid";
import { Ecosystem } from "@/components/landing/ecosystem";

export function AdvancedFeatures() {
  return (
    <section className="bg-neutral-50 border-t border-neutral-100">
      <div className="grid grid-cols-1">
        {/* Top: Bento Grid */}
        <div className="border-b border-neutral-100">
          <BentoGrid />
        </div>

        {/* Bottom: Ecosystem (Light Theme) */}
        <div className="bg-neutral-50/50 min-h-[600px] lg:min-h-[800px]">
           <Ecosystem />
        </div>
      </div>
    </section>
  );
}
