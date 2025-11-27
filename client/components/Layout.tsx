import { Sidebar } from "./Sidebar";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main
        className={cn(
          "flex-1 overflow-auto md:ml-0",
          "pt-16 md:pt-0",
          "font-sans",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
