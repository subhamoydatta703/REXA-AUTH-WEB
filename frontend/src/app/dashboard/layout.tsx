import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#050505] text-[#ededed]">
      <DashboardNav />
      <main className="flex-1 px-4 py-8 sm:px-6">{children}</main>
      <footer className="border-t border-neutral-900 bg-[#060606] py-4 text-center text-xs text-neutral-600 font-mono">
        REXA Console • CLI Token Management
      </footer>
    </div>
  );
}
