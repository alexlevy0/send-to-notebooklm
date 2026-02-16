import { AdvancedFeatures } from "@/components/landing/advanced-features";
import { BeforeAfter } from "@/components/landing/before-after";
import { ChaosToClarity } from "@/components/landing/chaos-to-clarity";
import { DemoSimulation } from "@/components/landing/demo-simulation";
import { EcosystemGraph } from "@/components/landing/ecosystem-graph";
import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { HolographicInterface } from "@/components/landing/holographic-interface";
import { HowItWorks } from "@/components/landing/how-it-works";
import { InfiniteMarquee3D } from "@/components/landing/infinite-marquee-3d";
import { MagneticCTA } from "@/components/landing/magnetic-cta";
import { Navbar } from "@/components/landing/navbar";
import { NeuralBrain } from "@/components/landing/neural-brain";
import { ParallaxFeatures } from "@/components/landing/parallax-features";
import { Pricing } from "@/components/landing/pricing";
import { Stats } from "@/components/landing/stats";
import { Testimonials } from "@/components/landing/testimonials";
import { TextReveal } from "@/components/landing/text-reveal";
import { UseCases } from "@/components/landing/use-cases";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-indigo-100 selection:text-indigo-900 bg-dot-pattern relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,transparent,white)] pointer-events-none" />
      <Navbar />
      <Hero />
      <Stats />
      <BeforeAfter />
      <HowItWorks />
      <ChaosToClarity />
      <Features />
      <Pricing />
      <UseCases />
      <Testimonials />
      <TextReveal />
      <FAQ />
      {/* <MagneticCTA /> */}
      {/* <NeuralBrain /> */}
      {/* <HolographicInterface /> */}
      {/* <ParallaxFeatures /> */}
      {/* <EcosystemGraph /> */}
      <InfiniteMarquee3D />
      {/* <AdvancedFeatures /> */}
      <DemoSimulation />
      <Footer />
    </div>
  );
}
