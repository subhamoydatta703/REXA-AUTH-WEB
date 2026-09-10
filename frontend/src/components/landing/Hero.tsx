import Link from "next/link";
import { ArrowRight, Cpu, Layers } from "lucide-react";
import { TerminalPreview } from "./TerminalPreview";

export function Hero() {
  return (
    <section id="overview" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-[#0d0d0d] px-3.5 py-1 text-xs text-neutral-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="font-mono text-[11px] text-neutral-400">REXA Core</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-300">Continuous reasoning up to 60 steps</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl sm:leading-[1.15]">
            A general-purpose, single-agent development harness.
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed font-normal">
            REXA understands a task, gathers context, reflects on its own plan, writes or edits code,
            runs commands, searches the web, investigates failures, and reports the result — all
            through one continuous conversation of up to 60 reasoning steps.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/sign-up"
            className="flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded border border-neutral-700 bg-neutral-100 px-5 text-sm font-medium text-black transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#workflow"
            className="flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded border border-neutral-800 bg-[#0d0d0d] px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#141414] hover:text-white"
          >
            Explore Execution Loop
          </a>
        </div>

        {/* Capability Tags */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] text-neutral-500">
          <div className="flex items-center gap-1.5 rounded border border-neutral-900 bg-[#0a0a0a] px-2.5 py-1">
            <Cpu className="h-3 w-3 text-neutral-400" />
            <span>Runtime: Bun</span>
          </div>
          <div className="flex items-center gap-1.5 rounded border border-neutral-900 bg-[#0a0a0a] px-2.5 py-1">
            <Layers className="h-3 w-3 text-neutral-400" />
            <span>Docker Sandbox</span>
          </div>
          <div className="flex items-center gap-1.5 rounded border border-neutral-900 bg-[#0a0a0a] px-2.5 py-1">
            <span>Pre-Execution Self-Reflection</span>
          </div>
          <div className="flex items-center gap-1.5 rounded border border-neutral-900 bg-[#0a0a0a] px-2.5 py-1">
            <span>Deterministic Verification</span>
          </div>
        </div>

        {/* Terminal Visual */}
        <div className="mt-12 flex justify-center">
          <TerminalPreview />
        </div>
      </div>
    </section>
  );
}
