import { Bot, FileSearch, ShieldCheck, Terminal, Cpu, Blocks } from "lucide-react";

const FEATURES = [
  {
    icon: Bot,
    title: "Autonomous Agent Core",
    description:
      "REXA reasons about multi-step development goals, maintaining state across a continuous session of up to 60 reasoning steps.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Execution Plan Reflection",
    description:
      "Reflects on proposed execution plans before taking action. Scraps and regenerates flawed or redundant plans before touching files.",
  },
  {
    icon: Terminal,
    title: "Docker Sandbox Execution",
    description:
      "Commands, tests, and builds run inside an isolated Docker environment to ensure system security and reproducible results.",
  },
  {
    icon: FileSearch,
    title: "Contextual Repository Research",
    description:
      "Maps project hierarchies, parses symbols, and retrieves surrounding dependencies to formulate well-grounded solutions.",
  },
  {
    icon: Cpu,
    title: "Bun Runtime Performance",
    description:
      "Powered natively by Bun for lightning-fast module resolution, script execution, and modern TypeScript support.",
  },
  {
    icon: Blocks,
    title: "Extensible Capability Architecture",
    description:
      "Designed to grow from a unified harness into specialized domain agents for research, planning, coding, and scheduling.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="border-t border-neutral-900 bg-[#050505] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-[#0d0d0d] px-2.5 py-1 font-mono text-[11px] text-neutral-400">
            <span>Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Practical engineering capabilities.
          </h2>
          <p className="text-sm text-neutral-400">
            Engineered as a pragmatic assistant for daily software engineering workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group rounded border border-neutral-900 bg-[#0a0a0a] p-5 transition-all hover:border-neutral-800 hover:bg-[#0c0c0c]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded border border-neutral-800 bg-[#121212] text-neutral-300 group-hover:border-neutral-700 group-hover:text-white transition-colors mb-4">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-neutral-100 text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
