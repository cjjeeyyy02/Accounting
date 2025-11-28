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
      return "text-[#7A7A7A]";
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

function RatioAnalysisContent() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-3 md:p-4 bg-[#F6F8FA] min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div>
            <h1 className="text-lg font-semibold text-[#2E5AAC] mb-1">
              Ratio Analysis
            </h1>
            <p className="text-[11px] md:text-[12px] text-[#7A7A7A]">
              Financial health through profitability and capacity ratios
            </p>
          </div>
          <Button className="bg-[#2E5AAC] hover:bg-[#1E3F7A] flex items-center gap-2 text-[11px] md:text-xs h-7 md:h-8">
            <Download size={13} />
            Export Report
          </Button>
        </div>

        {/* Overall Financial Health */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4 mb-3 md:mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs md:text-sm font-semibold text-[#2E5AAC] mb-1">
                Overall Financial Health
              </h2>
              <p className="text-[11px] md:text-[12px] text-[#7A7A7A]">
                Your company shows strong financial position and operational
                efficiency
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-2xl md:text-3xl font-bold text-green-600 leading-none">
                  A
                </p>
                <p className="text-[10px] text-green-600 font-semibold mt-0.5">
                  +
                </p>
              </div>
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Profitability Ratios */}
        <div className="mb-3 md:mb-4">
          <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2">
            Profitability Ratios
          </h2>
          <div className="space-y-2">
            {profitabilityRatios.map((ratio) => (
              <div
                key={ratio.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-[11px] md:text-xs font-semibold text-[#2E5AAC] mb-0.5">
                    {ratio.label}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-[#7A7A7A]">
                    {ratio.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-base md:text-lg font-bold ${getStatusColor(ratio.status)}`}
                  >
                    {ratio.value}
                  </p>
                  <span
                    className={`text-[10px] md:text-[11px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(
                      ratio.status,
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
        <div className="mb-3 md:mb-4">
          <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2">
            Liquidity Ratios
          </h2>
          <div className="space-y-2">
            {liquidityRatios.map((ratio) => (
              <div
                key={ratio.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-[11px] md:text-xs font-semibold text-[#2E5AAC] mb-0.5">
                    {ratio.label}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-[#7A7A7A]">
                    {ratio.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-base md:text-lg font-bold ${getStatusColor(ratio.status)}`}
                  >
                    {ratio.value}
                  </p>
                  <span
                    className={`text-[10px] md:text-[11px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(
                      ratio.status,
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
        <div>
          <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2">
            Efficiency Ratios
          </h2>
          <div className="space-y-2">
            {efficiencyRatios.map((ratio) => (
              <div
                key={ratio.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3 flex items-center justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-[11px] md:text-xs font-semibold text-[#2E5AAC] mb-0.5">
                    {ratio.label}
                  </h3>
                  <p className="text-[10px] md:text-[11px] text-[#7A7A7A]">
                    {ratio.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p
                    className={`text-base md:text-lg font-bold ${getStatusColor(ratio.status)}`}
                  >
                    {ratio.value}
                  </p>
                  <span
                    className={`text-[10px] md:text-[11px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(
                      ratio.status,
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
  );
}

function RatioAnalysis() {
  return (
    <Layout>
      <RatioAnalysisContent />
    </Layout>
  );
}

export default RatioAnalysis;
export { RatioAnalysisContent };
