import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Filter } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MetricCard {
  label: string;
  value: string;
  unit?: string;
}

interface KeyMetric {
  label: string;
  value: string;
}

interface Scenario {
  name: string;
  values: {
    label: string;
    value: string;
    status: string;
  }[];
}

const metricCards: MetricCard[] = [
  {
    label: "Break-even Point",
    value: "329",
    unit: "units",
  },
  {
    label: "Maximum Capacity",
    value: "1,200",
    unit: "units",
  },
  {
    label: "Break-even Revenue",
    value: "$55,000",
  },
];

const profitabilityData = [
  { units: 0, revenue: 0, fixedCost: 25000, totalCost: 25000, profit: -25000 },
  { units: 200, revenue: 40000, fixedCost: 25000, totalCost: 40000, profit: 0 },
  { units: 329, revenue: 65800, fixedCost: 25000, totalCost: 65000, profit: 800 },
  { units: 500, revenue: 100000, fixedCost: 25000, totalCost: 75000, profit: 25000 },
  { units: 750, revenue: 150000, fixedCost: 25000, totalCost: 112500, profit: 37500 },
  { units: 1000, revenue: 200000, fixedCost: 25000, totalCost: 150000, profit: 50000 },
  { units: 1200, revenue: 240000, fixedCost: 25000, totalCost: 180000, profit: 60000 },
];

const keyMetrics: KeyMetric[] = [
  { label: "Fixed Costs", value: "$43,000" },
  { label: "Unit Price", value: "$80" },
  { label: "Variable Cost per Unit", value: "$81" },
  { label: "Contribution Margin", value: "$29" },
  { label: "Break-even Quantity", value: "$130" },
  { label: "Break-even Revenue", value: "$36,121" },
];

const scenarios: Scenario[] = [
  {
    name: "Conservative",
    values: [
      { label: "Units Sold", value: "450", status: "Minor" },
      { label: "Revenue", value: "$90k", status: "Minor" },
      { label: "Profit", value: "$12k", status: "Minor" },
    ],
  },
  {
    name: "Current Plan",
    values: [
      { label: "Units Sold", value: "1,200", status: "Active" },
      { label: "Revenue", value: "$110k", status: "Active" },
      { label: "Profit", value: "$28k", status: "Active" },
    ],
  },
  {
    name: "Optimistic",
    values: [
      { label: "Units Sold", value: "2,000", status: "Success" },
      { label: "Revenue", value: "$220k", status: "Success" },
      { label: "Profit", value: "$65k", status: "Success" },
    ],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Minor":
      return "text-orange-600 bg-orange-50";
    case "Active":
      return "text-blue-600 bg-blue-50";
    case "Success":
      return "text-green-600 bg-green-50";
    default:
      return "text-[#7A7A7A] bg-gray-50";
  }
};

function BreakEvenAnalysisContent() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-3 md:p-4 bg-[#F6F8FA] min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <div>
              <h1 className="text-lg font-semibold text-[#2E5AAC] mb-1">
                Break-even Analysis
              </h1>
              <p className="text-[11px] md:text-[12px] text-[#7A7A7A]">
                Financial analysis through profitability and capacity ratios
              </p>
            </div>
            <Button className="bg-[#2E5AAC] hover:bg-[#1E3F7A] flex items-center gap-2 text-[11px] md:text-xs h-7 md:h-8">
              <Download size={13} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3"
              >
                <p className="text-[11px] md:text-xs text-[#7A7A7A] mb-1">{card.label}</p>
                <div className="flex items-baseline gap-1 mb-2">
                  <h3 className="text-base md:text-lg font-bold text-[#2E5AAC]">
                    {card.value}
                  </h3>
                  {card.unit && (
                    <span className="text-[10px] md:text-[11px] text-green-600 font-medium">
                      {card.unit}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={13} className="text-green-600" />
                  <span className="text-[11px] md:text-xs font-medium text-green-600">
                    Target achieved
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Profitability Analysis Chart */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4 mb-3 md:mb-4">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC]">
                Profitability Analysis
              </h2>
              <button className="flex items-center gap-2 px-2 md:px-3 py-1 text-[11px] md:text-xs text-[#7A7A7A] hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={13} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={140} minHeight={140}>
              <LineChart data={profitabilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="units" stroke="#6b7280" label={{ value: "Units Sold", position: "insideBottomRight", offset: -5 }} />
                <YAxis stroke="#6b7280" label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  dot={false}
                  strokeWidth={2}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="totalCost"
                  stroke="#ef4444"
                  dot={false}
                  strokeWidth={2}
                  name="Total Cost"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#3b82f6"
                  dot={false}
                  strokeWidth={2}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
            {keyMetrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3"
              >
                <p className="text-[11px] md:text-xs text-[#7A7A7A] mb-2">{metric.label}</p>
                <h3 className="text-base md:text-lg font-bold text-[#2E5AAC]">
                  {metric.value}
                </h3>
              </div>
            ))}
          </div>

          {/* Scenario Analysis */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4">
            <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-3">
              Scenario Analysis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              {scenarios.map((scenario) => (
                <div key={scenario.name} className="border border-[#E5E7EB] rounded-lg p-3">
                  <h3 className="text-xs md:text-sm font-semibold text-[#2E5AAC] mb-2">
                    {scenario.name}
                  </h3>
                  <div className="space-y-2">
                    {scenario.values.map((item, index) => (
                      <div key={index}>
                        <p className="text-[11px] md:text-xs text-[#7A7A7A] mb-1">
                          {item.label}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs md:text-sm font-bold text-[#2E5AAC]">
                            {item.value}
                          </p>
                          <span
                            className={`text-[10px] md:text-[11px] font-medium px-2 py-0.5 rounded ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

function BreakEvenAnalysis() {
  return (
    <Layout>
      <BreakEvenAnalysisContent />
    </Layout>
  );
}

export default BreakEvenAnalysis;
export { BreakEvenAnalysisContent };
