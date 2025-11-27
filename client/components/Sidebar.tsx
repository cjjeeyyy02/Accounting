import { useState, useEffect, useRef, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  User,
  Settings,
  LogOut,
  ChevronDown,
  CreditCard,
  FileText,
  Users,
  Package,
  Target,
  Cloud,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

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
  { label: "Accounts", icon: <User size={20} />, href: "/account" },
  { label: "Transactions", icon: <CreditCard size={20} />, href: "/transactions" },
  { label: "Invoices", icon: <FileText size={20} />, href: "/invoices" },
  { label: "Customers/Vendors", icon: <Users size={20} />, href: "/customers-vendors" },
  { label: "Inventory", icon: <Package size={20} />, href: "/inventory" },
  { label: "Budget", icon: <Target size={20} />, href: "/budget" },
  { label: "Upload Center", icon: <Cloud size={20} />, href: "/upload-center" },
];

export function Sidebar() {
  const { isOpen, setSidebarOpen } = useSidebar();
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

  const handleSubmenuClick = () => {
    // Save current scroll position before navigation
    if (navRef.current) {
      scrollPositionRef.current = navRef.current.scrollTop;
    }
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
      setTimeout(() => {
        if (navRef.current) {
          navRef.current.scrollTop = scrollPositionRef.current;
        }
      }, 0);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-[#1E3F7A] border-r border-[#1A2D4D] transition-all duration-300 ease-in-out z-40",
          "flex flex-col font-sans",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "shadow-sm"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#1A2D4D] bg-[#1E3F7A]">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl text-white hover:opacity-80 transition-opacity"
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
          className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide bg-[#1E3F7A]">
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
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-[14px] border-l-4",
                        isSubmenuActive || isExpanded
                          ? "bg-[#2E5AAC] text-white border-l-white"
                          : "text-white hover:bg-[#2D5A8C] border-l-transparent hover:border-l-[#4C7AB5]"
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
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-[14px] border-l-4",
                        isActive
                          ? "bg-[#2E5AAC] text-white border-l-white"
                          : "text-white hover:bg-[#2D5A8C] border-l-transparent hover:border-l-[#4C7AB5]"
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
                    <div className="mt-1 ml-4 space-y-1 border-l-2 border-[#E5E7EB] pl-2">
                      {item.submenu.map((subitem) => {
                        const isSubActive = location.pathname === subitem.href;
                        return (
                          <Link
                            key={subitem.href}
                            to={subitem.href}
                            onClick={handleSubmenuClick}
                            className={cn(
                              "block px-3 py-2 rounded-lg text-[13px] transition-all font-medium",
                              isSubActive
                                ? "bg-[#E8F0FF] text-[#2E5AAC] font-semibold"
                                : "text-[#7A7A7A] hover:bg-[#F6F8FA] hover:text-[#2E5AAC]"
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
        <div className="border-t border-[#E5E7EB] p-4 space-y-2 bg-[#F0F4FF]">
          <Link
            to="/settings"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#4C4C4C] hover:bg-[#F6F8FA] hover:text-[#2E5AAC] transition-all font-medium text-[14px]"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#4C4C4C] hover:bg-[#F6F8FA] hover:text-[#2E5AAC] transition-all text-left font-medium text-[14px]">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden md:block w-64 bg-[#F0F4FF] border-r border-[#E5E7EB]" />
    </>
  );
}
