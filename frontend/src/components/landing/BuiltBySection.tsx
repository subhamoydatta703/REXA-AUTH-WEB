import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BuiltBySection() {
  return (
    <section className="border-t border-neutral-900 bg-[#050505] py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-12">
        {/* Built By Statement */}
        <div className="space-y-3">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">Independent Development</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-200">
            Engineered with a focus on simplicity and agency.
          </h2>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            REXA is an independent project built by{" "}
            <a
              href="https://github.com/subhamoydatta703/REXA-SERVER"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-200 underline decoration-neutral-700 underline-offset-4 hover:text-white hover:decoration-neutral-400 transition-colors"
            >
              Subhamoy Datta
            </a>{" "}
            with the goal of exploring what a practical, extensible AI development harness can become.
          </p>
        </div>

        {/* Final CTA Box */}
        <div className="rounded-lg border border-neutral-800 bg-[#0a0a0a] p-8 sm:p-10 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight text-white">Ready to try REXA?</h3>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            Create your account and generate a secure token to connect REXA to your terminal.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/sign-up"
              className="flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded border border-neutral-700 bg-neutral-100 px-5 text-sm font-medium text-black transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/subhamoydatta703/REXA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-full sm:w-auto items-center justify-center gap-2 rounded border border-neutral-800 bg-[#121212] px-5 text-sm font-medium text-neutral-300 transition-colors hover:bg-[#181818] hover:text-white"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
