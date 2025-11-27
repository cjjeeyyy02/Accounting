import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Menu,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  "": "Dashboard",
  analysis: "Analysis",
  overview: "Overview",
  financial: "Financial Analysis",
  revenue: "Revenue Analysis",
  expense: "Expense Analysis",
  "cash-flow": "Cash Flow Analysis",
  customer: "Customer Analysis",
  variance: "Variance Analysis",
  "break-even": "Break-even Analysis",
  ratio: "Ratio Analysis",
  trend: "Trend Analysis",
  department: "Department Analysis",
  account: "Accounts",
  transactions: "Transactions",
  invoices: "Invoices",
  "customers-vendors": "Customers/Vendors",
  inventory: "Inventory",
  budget: "Budget",
  "upload-center": "Upload Center",
  reports: "Reports",
  settings: "Settings",
  customers: "Customers",
  trends: "Trends",
  charts: "Charts",
};

export function TopBar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount] = useState(3);
  const { toggleSidebar } = useSidebar();

  const getBreadcrumbs = (): BreadcrumbSegment[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);

    // Hide breadcrumb for analysis sub-modules
    const analysisSubModules = [
      "overview",
      "financial",
      "revenue",
      "expense",
      "cash-flow",
      "customer",
      "variance",
      "break-even",
      "ratio",
      "trend",
      "department",
    ];

    if (
      pathSegments.length === 2 &&
      pathSegments[0] === "analysis" &&
      analysisSubModules.includes(pathSegments[1])
    ) {
      return [];
    }

    if (pathSegments.length === 0) {
      return [{ label: "Dashboard" }];
    }

    const breadcrumbs: BreadcrumbSegment[] = [
      { label: "Dashboard", href: "/" },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[segment] || segment;
      const isLast = index === pathSegments.length - 1;

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left Section: Burger Menu, Search & Breadcrumbs */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          {/* Burger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-[#F6F8FA] h-9 w-9 flex-shrink-0 text-[#4C4C4C]"
          >
            <Menu size={20} />
          </Button>

          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A7A]"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 h-9 bg-[#F6F8FA] border-[#E5E7EB] focus:bg-white focus:border-[#2E5AAC] text-[#4C4C4C] placeholder-[#7A7A7A]"
            />
          </div>

          {/* Breadcrumbs */}
          <div className="flex-1 min-w-0 ml-4">
            <Breadcrumb>
              <BreadcrumbList className="text-[13px]">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link to={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          </div>
        </div>

        {/* Right Section: Notifications, Profile */}
        <div className="flex items-center gap-3">

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-[#F6F8FA] text-[#4C4C4C]"
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <p className="font-medium text-sm">New invoice received</p>
                <p className="text-xs text-gray-500 mt-1">
                  Invoice #2024-001 from Acme Corp
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <p className="font-medium text-sm">Payment processed</p>
                <p className="text-xs text-gray-500 mt-1">
                  $5,000 payment confirmed
                </p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <p className="font-medium text-sm">Low stock alert</p>
                <p className="text-xs text-gray-500 mt-1">
                  Hardware Equipment A is running low
                </p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-sm text-blue-600 hover:text-blue-700">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 hover:bg-gray-100 h-9 px-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <HelpCircle size={16} />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 text-red-600 focus:text-red-600">
                <LogOut size={16} />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
