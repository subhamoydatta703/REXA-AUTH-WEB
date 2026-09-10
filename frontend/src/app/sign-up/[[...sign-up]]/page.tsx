import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { RexaLogo } from "@/components/common/RexaLogo";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-4 py-12">
      {/* Brand Header */}
      <div className="mb-8 flex flex-col items-center space-y-2">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-wider text-neutral-100 transition-colors"
        >
          <RexaLogo size={28} />
          <span className="font-mono text-xl font-bold tracking-tight text-white">REXA</span>
        </Link>
        <p className="text-xs text-neutral-400 font-mono">Create an account for REXA CLI access</p>
      </div>

      {/* Clerk Auth Component */}
      <div className="w-full max-w-md flex justify-center">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/dashboard"
        />
      </div>

      <div className="mt-8 text-center text-xs text-neutral-600">
        <Link href="/" className="hover:text-neutral-400 transition-colors">
          ← Back to REXA overview
        </Link>
      </div>
    </div>
  );
}
