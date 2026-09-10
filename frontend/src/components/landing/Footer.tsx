import Link from "next/link";
import { RexaLogo } from "@/components/common/RexaLogo";

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-[#050505] py-8 text-xs text-neutral-500">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2 text-neutral-400">
          <RexaLogo size={20} />
          <span className="font-mono font-semibold text-neutral-200">REXA</span>
          <span className="text-neutral-600">—</span>
          <span>Single-Agent Development Harness</span>
        </div>

        <div className="flex items-center gap-5 text-neutral-400">
          <Link href="/sign-in" className="hover:text-neutral-200 transition-colors">
            Sign In
          </Link>
          <Link href="/sign-up" className="hover:text-neutral-200 transition-colors">
            Sign Up
          </Link>
          <a
            href="https://github.com/subhamoydatta703/REXA-SERVER"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-200 transition-colors"
          >
            GitHub
          </a>
        </div>

        <div className="text-neutral-600 font-mono text-[11px]">
          © {new Date().getFullYear()} REXA. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
