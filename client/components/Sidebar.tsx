import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubMenuItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  icon: ReactNode;
  href?: string;
  badge?: string;
  submenu?: SubMenuItem[];
}

const analysisSubmenu: SubMenuItem[] = [
  { label: "Overview", href: "/analysis/overview" },
  { label: "Financial Analysis", href: "/analysis/financial" },
  { label: "Revenue Analysis", href: "/analysis/revenue" },
  { label: "Expense Analysis", href: "/analysis/expense" },
  { label: "Cash Flow Analysis", href: "/analysis/cash-flow" },
  { label: "Customer Analysis", href: "/analysis/customer" },
  { label: "Variance Analysis", href: "/analysis/variance" },
  { label: "Break-even Analysis", href: "/analysis/break-even" },
  { label: "Ratio Analysis", href: "/analysis/ratio" },
  { label: "Trend Analysis", href: "/analysis/trend" },
  { label: "Department Analysis", href: "/analysis/department" },
];

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/" },
  { label: "Reports", icon: <BarChart3 size={20} />, href: "/reports" },
  {
    label: "Analysis",
    icon: <TrendingUp size={20} />,
    href: "/analysis",
    badge: "New",
    submenu: analysisSubmenu,
  },
  { label: "Account", icon: <User size={20} />, href: "/account" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(
    typeof window !== "undefined" && window.innerWidth >= 768
  );
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);

  const checkIsSubmenuActive = (submenu?: SubMenuItem[]) => {
    if (!submenu) return false;
    return submenu.some((item) => location.pathname === item.href);
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  // Auto-expand submenu if a child route is active
  useEffect(() => {
    for (const item of navItems) {
      if (item.submenu && checkIsSubmenuActive(item.submenu)) {
        setExpandedMenu(item.label);
        break;
      }
    }
  }, [location.pathname]);

  // Preserve sidebar scroll position on navigation
  useEffect(() => {
    if (navRef.current) {
      navRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [location.pathname]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-sidebar hover:bg-sidebar/80 text-sidebar-foreground"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out z-40",
          "flex flex-col font-sans",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl text-sidebar-primary hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold text-xs">
              FC
            </div>
            <span>Fincore</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <nav
          ref={navRef}
          onScroll={(e) => {
            scrollPositionRef.current = (e.target as HTMLDivElement).scrollTop;
          }}
          className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = item.href && location.pathname === item.href;
              const isSubmenuActive = checkIsSubmenuActive(item.submenu);
              const isExpanded = expandedMenu === item.label;

              return (
                <div key={item.label}>
                  {item.submenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        isSubmenuActive || isExpanded
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      {item.icon}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-sidebar-primary px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown
                        size={16}
                        className={cn(
                          "transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.href || "/"}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      {item.icon}
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="text-xs bg-sidebar-primary px-2 py-1 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.submenu && isExpanded && (
                    <div className="mt-1 ml-4 space-y-1 border-l border-sidebar-border">
                      {item.submenu.map((subitem) => {
                        const isSubActive = location.pathname === subitem.href;
                        return (
                          <Link
                            key={subitem.href}
                            to={subitem.href}
                            className={cn(
                              "block px-4 py-2 rounded-lg text-sm transition-all",
                              isSubActive
                                ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                          >
                            {subitem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Settings Section */}
        <div className="border-t border-sidebar-border p-4 space-y-2">
          <Link
            to="/settings"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all text-left">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden md:block w-64" />
    </>
  );
}
