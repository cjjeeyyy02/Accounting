import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, CheckCircle } from "lucide-react";

interface Ratio {
  label: string;
  value: string;
  description: string;
  status: "excellent" | "good" | "average" | "poor";
}

const profitabilityRatios: Ratio[] = [
  {
    label: "Gross Profit Margin",
    value: "73.3%",
    description: "Percentage of revenue after COGS",
    status: "excellent",
  },
  {
    label: "Operating Profit Margin",
    value: "38.2%",
    description: "Profitability from operations",
    status: "excellent",
  },
  {
    label: "Net Profit Margin",
    value: "28.6%",
    description: "Overall profitability",
    status: "excellent",
  },
  {
    label: "Return on Assets (ROA)",
    value: "18.3%",
    description: "Asset efficiency",
    status: "good",
  },
  {
    label: "Return on Equity (ROE)",
    value: "44.6%",
    description: "Shareholder returns",
    status: "excellent",
  },
];

const liquidityRatios: Ratio[] = [
  {
    label: "Current Ratio",
    value: "2.45",
    description: "Short-term solvency",
    status: "excellent",
  },
  {
    label: "Quick Ratio",
    value: "1.89",
    description: "Liquid asset ratio",
    status: "excellent",
  },
  {
    label: "Cash Ratio",
    value: "1.12",
    description: "Immediate liquidity",
    status: "good",
  },
];

const efficiencyRatios: Ratio[] = [
  {
    label: "Asset Turnover",
    value: "3.12",
    description: "Asset utilization",
    status: "good",
  },
  {
    label: "Inventory Turnover",
    value: "8.43",
    description: "Inventory management",
    status: "excellent",
  },
  {
    label: "Receivables Turnover",
    value: "12.3",
    description: "Collection efficiency",
    status: "excellent",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "excellent":
      return "text-green-600";
    case "good":
      return "text-blue-600";
    case "average":
      return "text-yellow-600";
    case "poor":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "excellent":
      return "Excellent";
    case "good":
      return "Good";
    case "average":
      return "Average";
    case "poor":
      return "Poor";
    default:
      return "Unknown";
  }
};

export default function RatioAnalysis() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Ratio Analysis
              </h1>
              <p className="text-gray-600">
                Financial health through profitability and capacity ratios
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Download size={16} />
              Export Report
            </Button>
          </div>

          {/* Overall Financial Health */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Overall Financial Health
                </h2>
                <p className="text-gray-600">
                  Your company shows strong financial position and operational efficiency
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-5xl font-bold text-green-600 leading-none">
                    A
                  </p>
                  <p className="text-sm text-green-600 font-semibold mt-1">+</p>
                </div>
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </div>
          </div>

          {/* Profitability Ratios */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Profitability Ratios
            </h2>
            <div className="space-y-4">
              {profitabilityRatios.map((ratio) => (
                <div
                  key={ratio.label}
                  className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {ratio.label}
                    </h3>
                    <p className="text-xs text-gray-600">{ratio.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`text-2xl font-bold ${getStatusColor(ratio.status)}`}>
                      {ratio.value}
                    </p>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        ratio.status
                      )} ${
                        ratio.status === "excellent"
                          ? "bg-green-100"
                          : ratio.status === "good"
                          ? "bg-blue-100"
                          : ratio.status === "average"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                      }`}
                    >
                      {getStatusLabel(ratio.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Liquidity Ratios */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Liquidity Ratios
            </h2>
            <div className="space-y-4">
              {liquidityRatios.map((ratio) => (
                <div
                  key={ratio.label}
                  className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {ratio.label}
                    </h3>
                    <p className="text-xs text-gray-600">{ratio.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`text-2xl font-bold ${getStatusColor(ratio.status)}`}>
                      {ratio.value}
                    </p>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        ratio.status
                      )} ${
                        ratio.status === "excellent"
                          ? "bg-green-100"
                          : ratio.status === "good"
                          ? "bg-blue-100"
                          : ratio.status === "average"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                      }`}
                    >
                      {getStatusLabel(ratio.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency Ratios */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Efficiency Ratios
            </h2>
            <div className="space-y-4">
              {efficiencyRatios.map((ratio) => (
                <div
                  key={ratio.label}
                  className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                      {ratio.label}
                    </h3>
                    <p className="text-xs text-gray-600">{ratio.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`text-2xl font-bold ${getStatusColor(ratio.status)}`}>
                      {ratio.value}
                    </p>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        ratio.status
                      )} ${
                        ratio.status === "excellent"
                          ? "bg-green-100"
                          : ratio.status === "good"
                          ? "bg-blue-100"
                          : ratio.status === "average"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                      }`}
                    >
                      {getStatusLabel(ratio.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
