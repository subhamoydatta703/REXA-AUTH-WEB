import Link from "next/link";
import { RexaLogo } from "@/components/common/RexaLogo";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-900/80 bg-[#050505]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-sm font-semibold tracking-wider text-neutral-100 transition-colors"
          >
            <RexaLogo size={24} className="group-hover:border-neutral-600 transition-colors" />
            <span className="font-mono text-base font-bold tracking-tight text-white">REXA</span>
          </Link>
          <span className="hidden items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-2 py-0.5 font-mono text-[11px] text-neutral-400 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80"></span>
            agent harness
          </span>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden items-center gap-6 text-xs font-medium text-neutral-400 md:flex">
          <Link href="#overview" className="transition-colors hover:text-neutral-200">
            Overview
          </Link>
          <Link href="#philosophy" className="transition-colors hover:text-neutral-200">
            Architecture
          </Link>
          <Link href="#workflow" className="transition-colors hover:text-neutral-200">
            Execution Loop
          </Link>
          <Link href="#cli" className="transition-colors hover:text-neutral-200">
            Terminal CLI
          </Link>
        </nav>

        {/* Right: Auth Actions */}
        <div className="flex items-center gap-3 text-xs">
          <Link
            href="/sign-in"
            className="px-3 py-1.5 font-medium text-neutral-400 transition-colors hover:text-neutral-100"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded border border-neutral-700 bg-neutral-100 px-3.5 py-1.5 font-medium text-neutral-950 transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
