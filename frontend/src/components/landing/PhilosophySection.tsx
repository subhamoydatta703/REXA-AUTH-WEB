import { Compass, Sparkles, Workflow } from "lucide-react";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="border-t border-neutral-900 bg-[#050505] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left column: Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-[#0d0d0d] px-2.5 py-1 font-mono text-[11px] text-neutral-400">
              <Sparkles className="h-3 w-3 text-neutral-300" />
              <span>Agent Philosophy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why REXA is more than a tool runner.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              REXA is an autonomous agent, not a collection of disconnected commands. The model
              decides which capabilities are needed, calls them in sequence, observes their results,
              and continues until it can answer or complete the task.
            </p>
            <div className="pt-2">
              <div className="rounded border border-neutral-800/90 bg-[#0a0a0a] p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 font-mono text-neutral-200 font-semibold">
                  <Workflow className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Pre-Execution Plan Reflection</span>
                </div>
                <p className="text-neutral-400 leading-normal">
                  Before executing any tool call, REXA reflects on its own proposed plan — if the
                  plan is flawed, redundant, or hallucinated, it scraps it and re-generates before
                  touching anything.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: 3 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-neutral-800 bg-[#111111] text-neutral-300">
                <Compass className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-neutral-100 text-sm">Autonomous Sequencing</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Rather than asking users to orchestrate toolchains, REXA maps state, evaluates next
                steps, and executes tools in sequence until verified completion.
              </p>
            </div>

            <div className="rounded border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-neutral-800 bg-[#111111] text-neutral-300">
                <span className="font-mono text-xs font-bold text-neutral-300">60x</span>
              </div>
              <h3 className="font-semibold text-neutral-100 text-sm">Deep Reasoning Window</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Complex engineering tasks require iterative problem solving. REXA maintains deep
                memory and context across conversations of up to 60 reasoning steps.
              </p>
            </div>

            <div className="rounded border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-neutral-800 bg-[#111111] text-neutral-300">
                <span className="font-mono text-xs font-bold text-neutral-300">100%</span>
              </div>
              <h3 className="font-semibold text-neutral-100 text-sm">Ground-Truth Verification</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                REXA re-reads modified files directly from disk and runs tests in an isolated Docker
                container to reason from actual results rather than assumptions.
              </p>
            </div>

            <div className="rounded border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded border border-neutral-800 bg-[#111111] text-neutral-300">
                <span className="font-mono text-xs font-bold text-neutral-300">M-A</span>
              </div>
              <h3 className="font-semibold text-neutral-100 text-sm">Multi-Agent Roadmap</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Engineered to scale into specialized agents for deep research, planning, code synthesis,
                and scheduling under a unified single-agent command harness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
