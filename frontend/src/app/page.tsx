import { Navbar } from "@/components/landing/Navbar";
import { HarnessNotice } from "@/components/landing/HarnessNotice";
import { Hero } from "@/components/landing/Hero";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import { LifecycleWorkflow } from "@/components/landing/LifecycleWorkflow";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CliSection } from "@/components/landing/CliSection";
import { BuiltBySection } from "@/components/landing/BuiltBySection";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-[#ededed]">
      <Navbar />
      <main className="flex-1">
        <HarnessNotice />
        <Hero />
        <PhilosophySection />
        <LifecycleWorkflow />
        <FeaturesGrid />
        <CliSection />
        <BuiltBySection />
      </main>
      <Footer />
    </div>
  );
}
