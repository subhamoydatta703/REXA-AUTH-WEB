import { ShieldAlert } from "lucide-react";

export function HarnessNotice() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-2.5 rounded border border-neutral-800/80 bg-[#0a0a0a] p-3.5 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="flex items-start gap-2.5 text-neutral-300">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
          <p className="leading-relaxed">
            <span className="font-semibold text-neutral-200">Security & Sandboxing:</span> REXA is a
            general-purpose single-agent development harness. Review tool requests carefully and run
            commands inside configured Docker containers when working with sensitive repositories or
            permissions.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-neutral-400">
          <span className="rounded border border-neutral-800 bg-[#121212] px-2 py-0.5">
            Docker Sandbox
          </span>
          <span className="rounded border border-neutral-800 bg-[#121212] px-2 py-0.5">
            Bun Runtime
          </span>
        </div>
      </div>
    </div>
  );
}
