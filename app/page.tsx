import { BeforeAfter } from "@/components/landing/before-after";
import { CTA } from "@/components/landing/cta";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <BeforeAfter />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
