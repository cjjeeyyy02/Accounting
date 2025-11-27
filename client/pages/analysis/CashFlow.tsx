import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
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
  change: number;
  isPositive: boolean;
}

interface QuarterlyActivity {
  activity: string;
  value: number;
}

const metricCards: MetricCard[] = [
  {
    label: "Operating Cash Flow",
    value: "$230k",
    change: 8.5,
    isPositive: true,
  },
  {
    label: "Investing Cash Flow",
    value: "$ -64k",
    change: -12.3,
    isPositive: false,
  },
  {
    label: "Financing Cash Flow",
    value: "$ -15k",
    change: -5.1,
    isPositive: false,
  },
  {
    label: "Net Cash Position",
    value: "$115k",
    change: 15.8,
    isPositive: true,
  },
];

const cashFlowTrendsData = [
  {
    month: "Jan",
    operating: 35000,
    investing: -8000,
    financing: -2000,
  },
  {
    month: "Feb",
    operating: 42000,
    investing: -9000,
    financing: -2500,
  },
  {
    month: "Mar",
    operating: 38000,
    investing: -7500,
    financing: -2000,
  },
  {
    month: "Apr",
    operating: 45000,
    investing: -10000,
    financing: -3000,
  },
  {
    month: "May",
    operating: 40000,
    investing: -8500,
    financing: -2500,
  },
  {
    month: "Jun",
    operating: 48000,
    investing: -11000,
    financing: -3500,
  },
];

const netCashPositionData = [
  { month: "Jan", position: 25000 },
  { month: "Feb", position: 57000 },
  { month: "Mar", position: 87500 },
  { month: "Apr", position: 119500 },
  { month: "May", position: 148500 },
  { month: "Jun", position: 230500 },
];

const q1QuarterlyActivity: QuarterlyActivity[] = [
  { activity: "Cash from Operations", value: 115000 },
  { activity: "Capex & Investments", value: 24500 },
  { activity: "Debt Repayment", value: 6500 },
  { activity: "Dividends Paid", value: 8000 },
];

const q2QuarterlyActivity: QuarterlyActivity[] = [
  { activity: "Cash from Operations", value: 133000 },
  { activity: "Capex & Investments", value: 29500 },
  { activity: "Debt Repayment", value: 7500 },
  { activity: "Dividends Paid", value: 9500 },
];

function CashFlowAnalysisContent() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-3 md:p-4 bg-[#F6F8FA] min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-[#2E5AAC] mb-1">
                Cash Flow Analysis
              </h1>
              <p className="text-[11px] md:text-[12px] text-[#7A7A7A]">
                Operating, investing, and financing cash movements
              </p>
            </div>
            <Button className="bg-[#2E5AAC] hover:bg-[#1E3F7A] flex items-center gap-2 text-[11px] md:text-xs h-7 md:h-8">
              <Download size={13} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 mb-3">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3"
              >
                <p className="text-[11px] md:text-xs text-[#7A7A7A] mb-1">{card.label}</p>
                <h3
                  className={`text-base md:text-lg font-bold mb-1 ${
                    card.isPositive ? "text-[#2E5AAC]" : "text-red-600"
                  }`}
                >
                  {card.value}
                </h3>
                <div className="flex items-center gap-1">
                  {card.isPositive ? (
                    <TrendingUp size={13} className="text-green-600" />
                  ) : (
                    <TrendingDown size={13} className="text-red-600" />
                  )}
                  <span
                    className={`text-[10px] md:text-xs font-medium ${
                      card.isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {card.isPositive ? "+" : ""}
                    {card.change}% from last period
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cash Flow Trends Chart */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4 mb-3">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC]">
                Cash Flow Trends
              </h2>
              <button className="flex items-center gap-2 px-2 md:px-3 py-1 text-[11px] md:text-xs text-[#7A7A7A] hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={13} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={120} minHeight={120}>
              <BarChart data={cashFlowTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="operating" fill="#3b82f6" name="Operating" />
                <Bar dataKey="investing" fill="#10b981" name="Investing" />
                <Bar dataKey="financing" fill="#f59e0b" name="Financing" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Net Cash Position Chart */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4 mb-3">
            <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2 md:mb-3">
              Net Cash Position
            </h2>

            <ResponsiveContainer width="100%" height={120} minHeight={120}>
              <LineChart data={netCashPositionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="position"
                  stroke="#10b981"
                  dot={false}
                  strokeWidth={2}
                  name="Cash Position"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quarterly Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Q1 Quarterly Activity */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4">
              <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2 md:mb-3">
                Q1 Quarterly Activity
              </h2>

              <div className="space-y-2">
                {q1QuarterlyActivity.map((item, index) => {
                  const maxValue = Math.max(...q1QuarterlyActivity.map(i => i.value));
                  const percentage = (item.value / maxValue) * 100;

                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[11px] md:text-xs font-medium text-[#2E5AAC]">
                          {item.activity}
                        </p>
                        <span className="text-[11px] md:text-xs font-semibold text-gray-700">
                          ${(item.value / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div className="h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2E5AAC] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Q2 Quarterly Activity */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4">
              <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2 md:mb-3">
                Q2 Quarterly Activity
              </h2>

              <div className="space-y-2">
                {q2QuarterlyActivity.map((item, index) => {
                  const maxValue = Math.max(...q2QuarterlyActivity.map(i => i.value));
                  const percentage = (item.value / maxValue) * 100;

                  return (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[11px] md:text-xs font-medium text-[#2E5AAC]">
                          {item.activity}
                        </p>
                        <span className="text-[11px] md:text-xs font-semibold text-gray-700">
                          ${(item.value / 1000).toFixed(0)}k
                        </span>
                      </div>
                      <div className="h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function CashFlowAnalysis() {
  return (
    <Layout>
      <CashFlowAnalysisContent />
    </Layout>
  );
}

export default CashFlowAnalysis;
export { CashFlowAnalysisContent };
