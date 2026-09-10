"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { RexaLogo } from "@/components/common/RexaLogo";

export function DashboardNav() {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#080808]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Left: Brand & Context */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-wider text-neutral-100 transition-colors"
          >
            <RexaLogo size={24} />
            <span className="font-mono text-base font-bold tracking-tight text-white">REXA</span>
          </Link>
          <span className="text-neutral-700">/</span>
          <span className="font-mono text-xs text-neutral-400">console</span>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-xs font-medium text-neutral-200">
                {user.fullName || user.primaryEmailAddress?.emailAddress?.split("@")[0] || "Developer"}
              </span>
              <span className="font-mono text-[10px] text-neutral-500">
                {user.primaryEmailAddress?.emailAddress || "connected"}
              </span>
            </div>
          )}
          <div className="flex items-center rounded-full border border-neutral-800 p-0.5 bg-[#0f0f0f]">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-7 w-7",
                },
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
