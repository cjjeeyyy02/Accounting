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
      return "text-green-600";
    case "trending":
      return "text-blue-600";
    case "warning":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "healthy":
      return "bg-green-50";
    case "trending":
      return "bg-blue-50";
    case "warning":
      return "bg-yellow-50";
    default:
      return "bg-gray-50";
  }
};

export default function FinancialAnalysis() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Financial Analysis
              </h1>
              <p className="text-gray-600">
                Deep dive into your financial position and performance metrics
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Download size={16} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <p className="text-sm text-gray-600 mb-2">{card.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {card.value}
                </h3>
                <div className="flex items-center gap-2">
                  {card.isPositive ? (
                    <TrendingUp size={16} className="text-green-600" />
                  ) : (
                    <TrendingDown size={16} className="text-red-600" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      card.isPositive ? "text-green-600" : "text-red-600"
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
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Balance Sheet Trends
              </h2>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
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
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Financial Ratios
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {financialRatios.map((ratio) => (
                <div
                  key={ratio.label}
                  className={`rounded-lg border border-gray-200 p-6 ${getStatusBgColor(
                    ratio.status
                  )}`}
                >
                  <p className="text-sm text-gray-600 mb-3">{ratio.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-3">
                    {ratio.value}
                  </p>
                  {ratio.change && (
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        ratio.status === "healthy"
                          ? "bg-green-100 text-green-700"
                          : ratio.status === "trending"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
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
    </Layout>
  );
}
