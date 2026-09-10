import {
  Search,
  BookOpen,
  RotateCcw,
  FileCode,
  Eye,
  TerminalSquare,
  RefreshCw,
  FileCheck2,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Map project & locate files",
    desc: "Inspects workspace topology, locates relevant modules, and indexes project symbols.",
    icon: Search,
  },
  {
    number: "02",
    title: "Read context & implementation",
    desc: "Examines surrounding logic, type definitions, and dependencies before drafting solutions.",
    icon: BookOpen,
  },
  {
    number: "03",
    title: "Reflect on proposed plan",
    desc: "Scrutinizes the proposed plan. If flawed, redundant, or hallucinated, scraps and re-generates.",
    icon: RotateCcw,
    highlight: true,
  },
  {
    number: "04",
    title: "Form focused code changes",
    desc: "Applies precise, minimal diffs using atomic create, write, or replace operations.",
    icon: FileCode,
  },
  {
    number: "05",
    title: "Re-read modified files",
    desc: "Reads the file back from disk to ground reasoning on actual file content rather than model memory.",
    icon: Eye,
  },
  {
    number: "06",
    title: "Run tests in Docker sandbox",
    desc: "Executes typechecks, linting, and automated test suites inside an isolated container.",
    icon: TerminalSquare,
  },
  {
    number: "07",
    title: "Inspect failures & iterate",
    desc: "Diagnoses stack traces, corrects edge cases, and repeats reasoning loop if needed.",
    icon: RefreshCw,
  },
  {
    number: "08",
    title: "Explain changes & verify",
    desc: "Provides a concise breakdown of modifications made and verification results.",
    icon: FileCheck2,
  },
];

export function LifecycleWorkflow() {
  return (
    <section id="workflow" className="border-t border-neutral-900 bg-[#070707] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-[#0d0d0d] px-2.5 py-1 font-mono text-[11px] text-neutral-400">
            <span>Deterministic Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            The 8-step autonomous development lifecycle.
          </h2>
          <p className="text-sm text-neutral-400">
            A single request combines repository inspection, code changes, Git operations, command
            execution, and containerized verification.
          </p>
        </div>

        {/* 8-step grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative rounded border p-4 transition-all ${
                  step.highlight
                    ? "border-neutral-700 bg-[#0f0f0f] shadow-lg shadow-black/50"
                    : "border-neutral-900 bg-[#0a0a0a] hover:border-neutral-800"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-semibold text-neutral-500">
                    {step.number}
                  </span>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded border ${
                      step.highlight
                        ? "border-neutral-700 bg-neutral-800 text-white"
                        : "border-neutral-800 bg-[#121212] text-neutral-400"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h3 className="font-semibold text-neutral-200 text-sm mb-1.5">{step.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
