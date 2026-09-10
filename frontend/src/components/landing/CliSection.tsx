import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export function CliSection() {
  return (
    <section id="cli" className="border-t border-neutral-900 bg-[#070707] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-lg border border-neutral-800 bg-[#0a0a0a] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-[#121212] px-2.5 py-1 font-mono text-[11px] text-neutral-400">
                <Terminal className="h-3 w-3 text-neutral-300" />
                <span>Developer Experience</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Built for the terminal.
              </h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Connect your account to the REXA CLI in seconds. Generate a one-time temporary
                token from your dashboard and interact with your agent harness directly within your
                local development environment.
              </p>
              <div className="pt-2">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 rounded border border-neutral-700 bg-neutral-100 px-4 py-2 text-xs font-medium text-black transition-all hover:bg-white"
                >
                  Connect Your CLI
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Right: Minimal CLI preview */}
            <div className="lg:col-span-6">
              <div className="rounded border border-neutral-800 bg-[#050505] p-4 font-mono text-xs text-neutral-300 space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[11px] text-neutral-500">
                  <span>bash — 80x24</span>
                  <span>cli authentication</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  <div className="text-neutral-400">
                    <span className="text-neutral-500 select-none">$ </span>
                    <span className="text-white">rexa login</span>
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    Authenticate REXA CLI with your web account.
                  </div>
                  <div className="text-neutral-400">
                    <span className="text-neutral-500 select-none">? </span>
                    <span>Enter CLI token: </span>
                    <span className="text-neutral-500 select-none">••••••••••••••••••••</span>
                  </div>
                  <div className="text-emerald-400/90 text-[11px] pt-1 flex items-center gap-1.5">
                    <span>✓</span>
                    <span>Authenticated successfully. Active session linked to Docker sandbox.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
