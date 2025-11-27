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
    icon: <DollarSign size={24} />,
    href: "/analysis/financial",
    color: "blue",
  },
  {
    title: "Revenue Analysis",
    description: "Revenue trends, customer insights, and growth patterns",
    icon: <TrendingUp size={24} />,
    href: "/analysis/revenue",
    color: "green",
  },
  {
    title: "Expense Analysis",
    description: "Spending patterns, category breakdown, and optimization",
    icon: <BarChart3 size={24} />,
    href: "/analysis/expense",
    color: "orange",
  },
  {
    title: "Cash Flow Analysis",
    description: "Operating, investing, and financing cash movements",
    icon: <ArrowUpRight size={24} />,
    href: "/analysis/cash-flow",
    color: "blue",
  },
  {
    title: "Customer Analysis",
    description: "Customer segments, value, and lifetime analysis",
    icon: <Users size={24} />,
    href: "/analysis/customer",
    color: "purple",
  },
  {
    title: "Variance Analysis",
    description: "Actual vs budget comparison and performance gaps",
    icon: <Activity size={24} />,
    href: "/analysis/variance",
    color: "red",
  },
  {
    title: "Break-even Analysis",
    description: "Financial analysis through profitability and capacity ratios",
    icon: <Target size={24} />,
    href: "/analysis/break-even",
    color: "pink",
  },
  {
    title: "Ratio Analysis",
    description: "Financial health through profitability and capacity ratios",
    icon: <Percent size={24} />,
    href: "/analysis/ratio",
    color: "teal",
  },
  {
    title: "Trend Analysis",
    description: "Historical data analysis and trend forecasting",
    icon: <TrendingUp size={24} />,
    href: "/analysis/trend",
    color: "indigo",
  },
  {
    title: "Department Analysis",
    description: "Operational efficiency and department-wise metrics",
    icon: <Zap size={24} />,
    href: "/analysis/department",
    color: "cyan",
  },
];

const getIconColor = (color: string) => {
  const colors: { [key: string]: string } = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
    red: "text-red-600",
    pink: "text-pink-600",
    teal: "text-teal-600",
    indigo: "text-indigo-600",
    cyan: "text-cyan-600",
  };
  return colors[color] || "text-blue-600";
};

export default function AnalyticsOverview() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-[22px] font-semibold text-gray-900 mb-1">
              Financial Analysis Center
            </h1>
            <p className="text-[12px] font-normal text-gray-600">
              Comprehensive analysis tools to understand your financial performance
            </p>
          </div>

          {/* Analysis Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {analysisCards.map((card) => (
              <Link
                key={card.href}
                to={card.href}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow hover:border-gray-300 cursor-pointer group no-underline"
              >
                <div className={`${getIconColor(card.color)} mb-3 group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-[11px] text-gray-600 mb-3 line-clamp-2">
                  {card.description}
                </p>
                <span className="text-[11px] font-medium text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                  View Details
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>

          {/* Key Insights Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
              Key Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Financial Rating */}
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-xs text-gray-600 mb-1">Financial Rating</p>
                <p className="text-[22px] font-bold text-gray-900 mb-1">A+ Rating</p>
                <p className="text-xs text-gray-600">Strong financial position</p>
              </div>

              {/* Revenue Growth */}
              <div className="border-l-4 border-green-600 pl-4">
                <p className="text-xs text-gray-600 mb-1">Revenue Growth</p>
                <p className="text-[22px] font-bold text-gray-900 mb-1">+32.15% YoY</p>
                <p className="text-xs text-gray-600">Consistent growth trajectory</p>
              </div>

              {/* Operational Efficiency */}
              <div className="border-l-4 border-purple-600 pl-4">
                <p className="text-xs text-gray-600 mb-1">Operational Efficiency</p>
                <p className="text-[22px] font-bold text-gray-900 mb-1">28.4%</p>
                <p className="text-xs text-gray-600">Efficiency improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
