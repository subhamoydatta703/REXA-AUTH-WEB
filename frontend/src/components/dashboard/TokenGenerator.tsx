"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { generateCliToken } from "@/lib/api";
import { CountdownTimer } from "./CountdownTimer";
import {
  Copy,
  Check,
  ShieldCheck,
  AlertTriangle,
  Terminal,
  Loader2,
  RefreshCw,
  KeyRound,
} from "lucide-react";

type TokenStatus = "idle" | "generating" | "success" | "expired" | "error";

export function TokenGenerator() {
  const { getToken } = useAuth();

  const [status, setStatus] = useState<TokenStatus>("idle");
  // CRITICAL: Plaintext token is stored strictly in temporary React component state.
  // Never written to localStorage, sessionStorage, cookies, or browser history/URLs.
  const [token, setToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  const handleGenerateToken = async () => {
    if (status === "generating") return;

    setStatus("generating");
    setErrorMessage(null);
    setCopyError(null);
    setCopied(false);

    try {
      // Obtain valid Clerk session JWT to authenticate request
      const sessionToken = await getToken();
      const response = await generateCliToken(sessionToken);

      setToken(response.token);
      setExpiresAt(response.expiresAt);
      setStatus("success");
    } catch (err) {
      setToken(null);
      setExpiresAt(null);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to generate token. Please check your connection and try again."
      );
    }
  };

  const handleExpire = () => {
    // Immediate state wipe upon expiration
    setToken(null);
    setExpiresAt(null);
    setStatus("expired");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!token) return;

    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setCopyError(null);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError("Could not copy to clipboard. Please copy manually.");
    }
  };

  return (
    <div className="rounded-lg border border-neutral-800 bg-[#0a0a0a] p-6 sm:p-8">
      {/* 1. IDLE STATE */}
      {status === "idle" && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-neutral-400" />
              <h3 className="font-semibold text-neutral-100 text-sm">CLI authentication</h3>
            </div>
            <p className="text-xs text-neutral-400">
              Generate a temporary token to authenticate REXA from your terminal.
            </p>
          </div>

          <div className="rounded border border-neutral-900 bg-[#060606] p-4 text-xs space-y-2 text-neutral-400">
            <div className="flex items-center gap-2 text-neutral-300 font-medium">
              <ShieldCheck className="h-4 w-4 text-neutral-400" />
              <span>Security information</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-neutral-400 text-[11px]">
              <li>Your token will be shown only once.</li>
              <li>It expires 10 minutes after generation.</li>
              <li>Never share this token or commit it to version control.</li>
            </ul>
          </div>

          <div>
            <button
              onClick={handleGenerateToken}
              className="flex items-center gap-2 rounded border border-neutral-700 bg-neutral-100 px-4 py-2 text-xs font-medium text-black transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              Generate token
            </button>
          </div>
        </div>
      )}

      {/* 2. GENERATING STATE */}
      {status === "generating" && (
        <div className="space-y-6 py-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <KeyRound className="h-4 w-4 text-neutral-400" />
              <h3 className="font-semibold text-neutral-100 text-sm">CLI authentication</h3>
            </div>
            <p className="text-xs text-neutral-400">
              Communicating securely with the authentication service...
            </p>
          </div>

          <div>
            <button
              disabled
              className="flex items-center gap-2 rounded border border-neutral-800 bg-[#161616] px-4 py-2 text-xs font-medium text-neutral-400 cursor-not-allowed"
            >
              <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-400" />
              Generating...
            </button>
          </div>
        </div>
      )}

      {/* 3. SUCCESS STATE */}
      {status === "success" && token && expiresAt && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-900 pb-4">
            <div>
              <h3 className="font-semibold text-neutral-100 text-sm">Your REXA CLI token</h3>
              <p className="text-xs text-neutral-400">Use this token to link your terminal session.</p>
            </div>
            <CountdownTimer expiresAt={expiresAt} onExpire={handleExpire} />
          </div>

          {/* Token Display Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3 rounded border border-neutral-800 bg-[#050505] p-3">
              <code className="font-mono text-xs text-neutral-200 break-all select-all">
                {token}
              </code>
              <button
                onClick={handleCopy}
                className={`flex shrink-0 items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-medium transition-all ${
                  copied
                    ? "border-emerald-700 bg-emerald-950/40 text-emerald-300"
                    : "border-neutral-700 bg-[#141414] text-neutral-200 hover:bg-[#1a1a1a] hover:text-white"
                }`}
                title="Copy token to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            {copyError && <p className="text-[11px] text-rose-400">{copyError}</p>}
          </div>

          {/* Critical One-Time Notice */}
          <div className="rounded border border-amber-900/50 bg-amber-950/20 p-3.5 text-xs text-amber-200/90 space-y-1">
            <div className="flex items-center gap-2 font-medium text-amber-300">
              <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400" />
              <span>This token will only be shown once.</span>
            </div>
            <p className="pl-6 text-[11px] text-amber-300/80 leading-relaxed">
              Copy it now. You won&apos;t be able to view this token again. The token will be purged
              from memory upon expiration or page navigation.
            </p>
          </div>

          {/* CLI Instructions */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-300">
              <Terminal className="h-3.5 w-3.5 text-neutral-400" />
              <span>Use it in REXA</span>
            </div>
            <p className="text-xs text-neutral-400">Open your terminal and run:</p>
            <div className="rounded border border-neutral-800 bg-[#050505] p-3 font-mono text-xs text-neutral-300 flex items-center justify-between">
              <div>
                <span className="text-neutral-500 select-none">$ </span>
                <span className="text-white">rexa login</span>
              </div>
            </div>
            <p className="text-[11px] text-neutral-500">
              Paste your copied token when prompted by the CLI.
            </p>
          </div>
        </div>
      )}

      {/* 4. EXPIRED STATE */}
      {status === "expired" && (
        <div className="space-y-5">
          <div className="rounded border border-neutral-800 bg-[#080808] p-4 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-neutral-300">
              <AlertTriangle className="h-4 w-4 text-neutral-400" />
              <span>Token expired</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              This token is no longer valid. Generate a new token to continue.
            </p>
          </div>

          <div>
            <button
              onClick={handleGenerateToken}
              className="flex items-center gap-2 rounded border border-neutral-700 bg-neutral-100 px-4 py-2 text-xs font-medium text-black transition-all hover:bg-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Generate new token
            </button>
          </div>
        </div>
      )}

      {/* 5. ERROR STATE */}
      {status === "error" && (
        <div className="space-y-5">
          <div className="rounded border border-rose-950/60 bg-rose-950/20 p-4 text-xs space-y-1.5 text-rose-300">
            <div className="flex items-center gap-2 font-semibold text-rose-200">
              <AlertTriangle className="h-4 w-4" />
              <span>Generation failed</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {errorMessage || "An unexpected error occurred while generating the token."}
            </p>
          </div>

          <div>
            <button
              onClick={handleGenerateToken}
              className="flex items-center gap-2 rounded border border-neutral-700 bg-neutral-100 px-4 py-2 text-xs font-medium text-black transition-all hover:bg-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Try again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
