import { TokenGenerator } from "@/components/dashboard/TokenGenerator";
import { Shield, Terminal } from "lucide-react";
import { RexaLogo } from "@/components/common/RexaLogo";

export const metadata = {
  title: "REXA Console — CLI Authentication",
  description: "Connect your REXA CLI via secure one-time authentication tokens.",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header section */}
      <div className="space-y-2 border-b border-neutral-800/80 pb-6">
        <div className="flex items-center gap-2.5">
          <RexaLogo size={24} />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Connect your REXA CLI
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400">
          Generate a secure authentication token to connect the REXA CLI to your account.
        </p>
      </div>

      {/* Main Token Generation Module */}
      <TokenGenerator />

      {/* Auxiliary Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="rounded border border-neutral-900 bg-[#080808] p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-neutral-300 font-medium">
            <Shield className="h-4 w-4 text-neutral-400" />
            <span>Single-Use Session Tokens</span>
          </div>
          <p className="text-neutral-400 leading-relaxed text-[11px]">
            Generated tokens are bound to your user identity and expire after 7 days.
            Tokens are never persisted on the browser or exposed in URLs.
          </p>
        </div>

        <div className="rounded border border-neutral-900 bg-[#080808] p-4 text-xs space-y-2">
          <div className="flex items-center gap-2 text-neutral-300 font-medium">
            <Terminal className="h-4 w-4 text-neutral-400" />
            <span>Terminal CLI Commands</span>
          </div>
          <p className="text-neutral-400 leading-relaxed text-[11px]">
            Once authenticated via <code className="text-neutral-300 bg-neutral-900 px-1 py-0.5 rounded">rexa login</code>,
            your terminal CLI can execute sandboxed tasks and inspect repository context.
          </p>
        </div>
      </div>
    </div>
  );
}
