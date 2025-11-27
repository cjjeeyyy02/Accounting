import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#F6F8FA]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main
          className={cn(
            "flex-1 overflow-auto",
            "font-sans",
            "bg-[#F6F8FA]",
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
