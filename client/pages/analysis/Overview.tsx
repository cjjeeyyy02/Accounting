import { Layout } from "@/components/Layout";
import { BarChart3, TrendingUp, DollarSign, ArrowUpRight, Zap, PieChart, Target, Percent, Activity, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface AnalysisCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

const analysisCards: AnalysisCard[] = [
  {
    title: "Financial Analysis",
    description: "Review asset ratios, alerts, liabilities, and equity metrics",
    icon: <DollarSign size={20} />,
    href: "/analysis/financial",
    color: "blue",
  },
  {
    title: "Revenue Analysis",
    description: "Revenue trends, customer insights, and growth patterns",
    icon: <TrendingUp size={20} />,
    href: "/analysis/revenue",
    color: "green",
  },
  {
    title: "Expense Analysis",
    description: "Spending patterns, category breakdown, and optimization",
    icon: <BarChart3 size={20} />,
    href: "/analysis/expense",
    color: "orange",
  },
  {
    title: "Cash Flow Analysis",
    description: "Operating, investing, and financing cash movements",
    icon: <ArrowUpRight size={20} />,
    href: "/analysis/cash-flow",
    color: "blue",
  },
  {
    title: "Customer Analysis",
    description: "Customer segments, value, and lifetime analysis",
    icon: <Users size={20} />,
    href: "/analysis/customer",
    color: "purple",
  },
  {
    title: "Variance Analysis",
    description: "Actual vs budget comparison and performance gaps",
    icon: <Activity size={20} />,
    href: "/analysis/variance",
    color: "red",
  },
  {
    title: "Break-even Analysis",
    description: "Financial analysis through profitability and capacity ratios",
    icon: <Target size={20} />,
    href: "/analysis/break-even",
    color: "pink",
  },
  {
    title: "Ratio Analysis",
    description: "Financial health through profitability and capacity ratios",
    icon: <Percent size={20} />,
    href: "/analysis/ratio",
    color: "teal",
  },
  {
    title: "Trend Analysis",
    description: "Historical data analysis and trend forecasting",
    icon: <TrendingUp size={20} />,
    href: "/analysis/trend",
    color: "indigo",
  },
  {
    title: "Department Analysis",
    description: "Operational efficiency and department-wise metrics",
    icon: <Zap size={20} />,
    href: "/analysis/department",
    color: "cyan",
  },
];

const getIconColor = (color: string) => {
  const colors: { [key: string]: string } = {
    blue: "text-[#2E5AAC]",
    green: "text-[#10B981]",
    orange: "text-[#F59E0B]",
    purple: "text-[#8B5CF6]",
    red: "text-[#EF4444]",
    pink: "text-[#EC4899]",
    teal: "text-[#00A8E8]",
    indigo: "text-[#4F46E5]",
    cyan: "text-[#06B6D4]",
  };
  return colors[color] || "text-[#2E5AAC]";
};

function AnalysisOverviewContent() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-4 bg-[#F6F8FA] min-h-screen">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-[#2E5AAC] mb-1">
              Financial Analysis Center
            </h1>
            <p className="text-[12px] font-normal text-[#7A7A7A]">
              Comprehensive analysis tools to understand your financial performance
            </p>
          </div>

          {/* Analysis Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
            {analysisCards.map((card) => (
              <Link
                key={card.href}
                to={card.href}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3 hover:shadow-md transition-shadow hover:border-[#2E5AAC] cursor-pointer group no-underline shadow-sm"
              >
                <div className={`${getIconColor(card.color)} mb-2 group-hover:scale-110 transition-transform`} style={{fontSize: '18px'}}>
                  {card.icon}
                </div>
                <h3 className="text-[12px] font-semibold text-[#2E5AAC] mb-1 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-[11px] text-[#7A7A7A] mb-2 line-clamp-2">
                  {card.description}
                </p>
                <span className="text-[10px] font-medium text-[#2E5AAC] group-hover:text-[#1E3F7A] flex items-center gap-0">
                  View Details
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Key Insights Section */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-[#2E5AAC] mb-4">
              Key Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Financial Rating */}
              <div className="border-l-4 border-[#2E5AAC] pl-3">
                <p className="text-[11px] font-medium text-[#7A7A7A] mb-1">Financial Rating</p>
                <p className="text-base font-semibold text-[#2E5AAC] mb-1">A+ Rating</p>
                <p className="text-[11px] text-[#7A7A7A]">Strong financial position</p>
              </div>

              {/* Revenue Growth */}
              <div className="border-l-4 border-[#10B981] pl-3">
                <p className="text-[11px] font-medium text-[#7A7A7A] mb-1">Revenue Growth</p>
                <p className="text-base font-semibold text-[#10B981] mb-1">+32.15% YoY</p>
                <p className="text-[11px] text-[#7A7A7A]">Consistent growth trajectory</p>
              </div>

              {/* Operational Efficiency */}
              <div className="border-l-4 border-[#8B5CF6] pl-3">
                <p className="text-[11px] font-medium text-[#7A7A7A] mb-1">Operational Efficiency</p>
                <p className="text-base font-semibold text-[#8B5CF6] mb-1">28.4%</p>
                <p className="text-[11px] text-[#7A7A7A]">Efficiency improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function AnalyticsOverview() {
  return (
    <Layout>
      <AnalysisOverviewContent />
    </Layout>
  );
}

export default AnalyticsOverview;
export { AnalysisOverviewContent };
