import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface MetricCard {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
}

interface FinancialRatio {
  label: string;
  value: string;
  change?: string;
  status: "trending" | "stable" | "warning" | "healthy";
}

const metricCards: MetricCard[] = [
  {
    label: "Total Assets",
    value: "$809.5k",
    change: 10.2,
    isPositive: true,
  },
  {
    label: "Total Liabilities",
    value: "$320k",
    change: -1.2,
    isPositive: false,
  },
  {
    label: "Total Equity",
    value: "$489.5k",
    change: 2.5,
    isPositive: true,
  },
];

const financialRatios: FinancialRatio[] = [
  {
    label: "Current Ratio",
    value: "2.45",
    change: "Excellent",
    status: "healthy",
  },
  {
    label: "Quick Ratio",
    value: "1.89",
    change: "Excellent",
    status: "healthy",
  },
  {
    label: "Debt-to-Equity",
    value: "0.65",
    change: "Healthy",
    status: "healthy",
  },
  {
    label: "ROA",
    value: "18.5%",
    change: "Strong",
    status: "trending",
  },
  {
    label: "ROE",
    value: "44.6%",
    change: "Excellent",
    status: "trending",
  },
  {
    label: "Asset Turnover",
    value: "3.12",
    change: "Optimal",
    status: "healthy",
  },
];

const balanceSheetData = [
  { month: "1", assets: 650000, liabilities: 280000, equity: 370000 },
  { month: "2", assets: 720000, liabilities: 290000, equity: 430000 },
  { month: "3", assets: 780000, liabilities: 300000, equity: 480000 },
  { month: "4", assets: 800000, liabilities: 310000, equity: 490000 },
  { month: "5", assets: 809500, liabilities: 320000, equity: 489500 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "text-[#10B981]";
    case "trending":
      return "text-[#00A8E8]";
    case "warning":
      return "text-[#F59E0B]";
    default:
      return "text-[#7A7A7A]";
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-[#F0FDF4]";
    case "trending":
      return "bg-[#F0F9FF]";
    case "warning":
      return "bg-[#FFFBF0]";
    default:
      return "bg-[#F6F8FA]";
  }
};

function FinancialAnalysisContent() {
  return (
    <div className="flex-1 overflow-auto">
        <div className="p-6 bg-[#F6F8FA] min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl md:text-[28px] font-semibold text-[#2E5AAC] mb-2">
                Financial Analysis
              </h1>
              <p className="text-[14px] font-normal text-[#7A7A7A]">
                Deep dive into your financial position and performance metrics
              </p>
            </div>
            <Button className="bg-[#2E5AAC] hover:bg-[#1E3F7A] text-white flex items-center gap-2 text-sm h-10 px-4 rounded-lg font-medium shadow-sm">
              <Download size={16} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-[13px] font-medium text-[#7A7A7A] mb-3">{card.label}</p>
                <h3 className="text-2xl font-semibold text-[#2E5AAC] mb-3">
                  {card.value}
                </h3>
                <div className="flex items-center gap-2">
                  {card.isPositive ? (
                    <TrendingUp size={16} className="text-[#10B981]" />
                  ) : (
                    <TrendingDown size={16} className="text-[#EF4444]" />
                  )}
                  <span
                    className={`text-[13px] font-medium ${
                      card.isPositive ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {card.isPositive ? "+" : ""}
                    {card.change}% from last month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Balance Sheet Trends Chart */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 mb-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-[#2E5AAC]">
                Balance Sheet Trends
              </h2>
              <button className="flex items-center gap-2 px-3 py-2 text-[13px] font-medium text-[#4C4C4C] hover:bg-[#F6F8FA] rounded-lg transition-colors border border-[#E5E7EB]">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={130} minHeight={130}>
              <LineChart data={balanceSheetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="assets"
                  stroke="#3b82f6"
                  dot={false}
                  name="Assets"
                />
                <Line
                  type="monotone"
                  dataKey="liabilities"
                  stroke="#ef4444"
                  dot={false}
                  name="Liabilities"
                />
                <Line
                  type="monotone"
                  dataKey="equity"
                  stroke="#10b981"
                  dot={false}
                  name="Equity"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Ratios */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#2E5AAC] mb-6">
              Financial Ratios
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialRatios.map((ratio) => (
                <div
                  key={ratio.label}
                  className={`rounded-lg border border-[#E5E7EB] p-4 ${getStatusBgColor(
                    ratio.status
                  )}`}
                >
                  <p className="text-[13px] font-medium text-[#7A7A7A] mb-2">{ratio.label}</p>
                  <p className="text-2xl font-semibold text-[#2E5AAC] mb-3">
                    {ratio.value}
                  </p>
                  {ratio.change && (
                    <span
                      className={`text-[12px] font-semibold px-3 py-1 rounded-full inline-block ${
                        ratio.status === "healthy"
                          ? "bg-[#10B981] bg-opacity-10 text-[#10B981]"
                          : ratio.status === "trending"
                          ? "bg-[#00A8E8] bg-opacity-10 text-[#00A8E8]"
                          : "bg-[#F59E0B] bg-opacity-10 text-[#F59E0B]"
                      }`}
                    >
                      {ratio.change}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default function FinancialAnalysis() {
  return (
    <Layout>
      <FinancialAnalysisContent />
    </Layout>
  );
}
