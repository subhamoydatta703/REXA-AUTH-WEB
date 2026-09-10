"use client";

import { useEffect, useState } from "react";

const REXA_ASCII = `| _ \\  ___|  \\/  /  \\
| |_) | _|  \\  / / _ \\
| _ <| |__/ \\ / /__ \\
|_| \\_\\____/\\_\\/\\_/   \\_\\`;

interface ToolStep {
  name: string;
  status: "running" | "done";
  time?: string;
  command?: string;
}

const TOOL_STEPS: ToolStep[] = [
  { name: "get_project_tree", status: "done", time: "0.3s" },
  { name: "coding_context_tool", status: "done", time: "0.2s" },
  { name: "code_tool", status: "done", time: "0.1s" },
  { name: "execute_command", status: "done", time: "3.1s", command: "bun test" },
];

export function TerminalPreview() {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const stepTimers: ReturnType<typeof setTimeout>[] = [];

    TOOL_STEPS.forEach((_, i) => {
      stepTimers.push(
        setTimeout(() => {
          setVisibleSteps(i + 1);
        }, 600 + i * 500)
      );
    });

    stepTimers.push(
      setTimeout(() => {
        setShowResult(true);
      }, 600 + TOOL_STEPS.length * 500 + 400)
    );

    return () => stepTimers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-4xl rounded-lg border border-neutral-800 bg-[#0c0c0c] font-mono text-[13px] shadow-2xl shadow-black/80 overflow-hidden">
      {/* Title bar */}
      <div className="flex h-9 items-center justify-between border-b border-neutral-800/80 bg-[#111] px-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[11px] text-neutral-500">rexa-cli — session</span>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 space-y-4 text-neutral-300 leading-relaxed overflow-x-auto">
        {/* ASCII Art */}
        <pre className="text-neutral-400 text-[11px] sm:text-xs leading-tight select-none whitespace-pre">
          {REXA_ASCII}
        </pre>

        {/* Version banner */}
        <div className="text-neutral-500 text-[11px] sm:text-xs">
          <div>+-----------------------------------------------+</div>
          <div>
            |{"  "}
            <span className="text-neutral-200 font-semibold">REXA CLI v1.0.0</span>
            {"  "}|{"  "}
            <span className="text-neutral-400">Autonomous Agent Harness</span>
            {"  "}|
          </div>
          <div>+-----------------------------------------------+</div>
        </div>

        {/* Conversational prompt */}
        <div className="space-y-2 pt-1">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 select-none">&gt;</span>
            <span className="text-neutral-200">
              Yo, it&apos;s me... REXA. What&apos;s the plan?
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 select-none">&gt;</span>
            <span className="text-neutral-100 font-medium">
              Find why the auth test is failing and fix it.
            </span>
          </div>
        </div>

        {/* Tool execution steps */}
        <div className="space-y-1 pt-1">
          {TOOL_STEPS.map((step, i) => (
            <div key={step.name + "-" + i}>
              {/* Running line */}
              <div
                className={`flex items-center gap-3 transition-opacity duration-300 ${
                  i < visibleSteps ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-amber-400 w-2 text-center select-none">*</span>
                <span className="text-neutral-400 w-44 sm:w-48 truncate">{step.name}</span>
                <span className="text-neutral-500">
                  {step.command ? (
                    <>
                      running{" "}
                      <span className="text-neutral-400">[{step.command}]</span>
                    </>
                  ) : (
                    "running..."
                  )}
                </span>
              </div>
              {/* Done line */}
              <div
                className={`flex items-center gap-3 transition-opacity duration-300 ${
                  i < visibleSteps ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="text-emerald-400 w-2 text-center select-none">+</span>
                <span className="text-neutral-300 w-44 sm:w-48 truncate">{step.name}</span>
                <span className="text-emerald-400/80">
                  done ({step.time})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Timestamp */}
        <div
          className={`text-neutral-500 text-[11px] pt-1 transition-opacity duration-500 ${
            showResult ? "opacity-100" : "opacity-0"
          }`}
        >
          rexa . 20:01
        </div>

        {/* Result */}
        <div
          className={`space-y-1 transition-opacity duration-500 ${
            showResult ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-neutral-200">
            Found the issue -- missing null check on line 42 of auth.ts.
          </p>
          <p className="text-neutral-200">
            Fixed with a guard clause.{"  "}
            <span className="text-emerald-400">All tests pass.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
