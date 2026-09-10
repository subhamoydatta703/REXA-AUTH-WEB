import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "REXA — General-Purpose Single-Agent Development Harness",
  description:
    "REXA understands a task, gathers context, reflects on its own plan, writes or edits code, runs commands, searches the web, and reports verified results.",
  keywords: [
    "REXA",
    "AI Agent",
    "Development Harness",
    "Autonomous Coding",
    "Docker Sandbox",
    "Bun Runtime",
    "CLI",
  ],
  authors: [{ name: "Subhamoy Datta" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "#ffffff",
          colorBackground: "#0d0d0d",
          borderRadius: "0.375rem",
        },
        elements: {
          card: "!border !border-neutral-800 !bg-[#0d0d0d] !shadow-2xl !shadow-black !text-neutral-100",
          headerTitle: "!text-white font-semibold tracking-tight text-lg",
          headerSubtitle: "!text-neutral-400 text-xs",
          socialButtonsBlockButton:
            "!border !border-neutral-800 !bg-[#141414] hover:!bg-[#1a1a1a] !text-white transition-colors",
          socialButtonsBlockButtonText: "!text-neutral-200 font-medium text-xs",
          dividerText: "!text-neutral-400 text-xs font-mono",
          dividerLine: "!bg-neutral-800",
          formFieldLabel: "!text-neutral-200 text-xs font-medium",
          formFieldInput:
            "!bg-[#141414] !border !border-neutral-700 focus:!border-neutral-400 focus:!ring-1 focus:!ring-neutral-400 !text-white placeholder:!text-neutral-500 text-sm",
          formButtonPrimary:
            "!bg-neutral-100 hover:!bg-white !text-black font-semibold text-xs py-2.5 transition-all shadow-md",
          footerActionText: "!text-neutral-400 text-xs",
          footerActionLink: "!text-white hover:!text-neutral-200 font-medium underline underline-offset-4",
          identityPreviewText: "!text-neutral-100 font-medium",
          identityPreviewEditButton: "!text-neutral-400 hover:!text-white",
          formFieldErrorText: "!text-rose-400 text-xs",
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#050505] text-[#ededed] antialiased selection:bg-neutral-800 selection:text-white`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
