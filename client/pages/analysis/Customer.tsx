import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
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
  change?: number;
  isPositive?: boolean;
}

interface CustomerSegment {
  name: string;
  count: number;
  percentage: number;
  icon: string;
}

interface TopCustomer {
  name: string;
  revenue: number;
}

interface CohortData {
  cohort: string;
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
}

const metricCards: MetricCard[] = [
  {
    label: "Total Customers",
    value: "167",
  },
  {
    label: "Average Customer Value",
    value: "$1,970",
  },
  {
    label: "Retention Rate",
    value: "73.3%",
    change: 2.1,
    isPositive: true,
  },
  {
    label: "Churn Rate",
    value: "8.8%",
    change: -1.5,
    isPositive: true,
  },
];

const customerSegments: CustomerSegment[] = [
  {
    name: "Enterprise",
    count: 53,
    percentage: 32,
    icon: "🏢",
  },
  {
    name: "Mid-Market",
    count: 29,
    percentage: 17,
    icon: "📊",
  },
  {
    name: "SMB",
    count: 45,
    percentage: 27,
    icon: "🚀",
  },
  {
    name: "Startup",
    count: 42,
    percentage: 24,
    icon: "⭐",
  },
];

const topCustomersData = [
  { name: "Acme Corp", revenue: 45000 },
  { name: "TechFlow Inc", revenue: 38000 },
  { name: "Global Solutions", revenue: 32000 },
  { name: "Digital Ventures", revenue: 28000 },
  { name: "NextGen Systems", revenue: 22000 },
  { name: "Innovation Labs", revenue: 18000 },
];

const cohortAnalysisData: CohortData[] = [
  { cohort: "Jan-23", jan: 100, feb: 92, mar: 85, apr: 78, may: 72, jun: 68 },
  { cohort: "Feb-23", feb: 98, mar: 90, apr: 82, may: 75, jun: 70 },
  { cohort: "Mar-23", mar: 95, apr: 88, may: 81, jun: 76 },
  { cohort: "Apr-23", apr: 102, may: 94, jun: 87 },
  { cohort: "May-23", may: 108, jun: 99 },
  { cohort: "Jun-23", jun: 115 },
];

export default function CustomerAnalysis() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                Customer Analysis
              </h1>
              <p className="text-[11px] md:text-[12px] text-gray-600">
                Customer segments, value, and lifetime analysis
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-[11px] md:text-xs h-7 md:h-8">
              <Download size={13} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 mb-3">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-gray-200 p-3"
              >
                <p className="text-[11px] md:text-xs text-gray-600 mb-1">{card.label}</p>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  {card.value}
                </h3>
                {card.change !== undefined && (
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
                )}
              </div>
            ))}
          </div>

          {/* Customer Segments */}
          <div className="mb-3">
            <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">
              Customer Segments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              {customerSegments.map((segment) => (
                <div
                  key={segment.name}
                  className="bg-white rounded-lg border border-gray-200 p-3"
                >
                  <div className="text-lg md:text-xl mb-2">{segment.icon}</div>
                  <p className="text-[11px] md:text-xs text-gray-600 mb-1">{segment.name}</p>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">
                    {segment.count}
                  </h3>
                  <div className="w-full h-1 md:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${segment.percentage}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-600 mt-1">
                    {segment.percentage}% of total
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Customers */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4 mb-3">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <h2 className="text-sm md:text-base font-semibold text-gray-900">Top Customers</h2>
              <button className="flex items-center gap-2 px-2 md:px-3 py-1 text-[11px] md:text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={13} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={120} minHeight={120}>
              <BarChart data={topCustomersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cohort Analysis */}
          <div className="bg-white rounded-lg border border-gray-200 p-3 md:p-4">
            <h2 className="text-sm md:text-base font-semibold text-gray-900 mb-2 md:mb-3">
              Cohort Analysis
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-[10px] md:text-xs font-semibold text-gray-900 px-2 md:px-3 py-1 md:py-2">
                      Cohort
                    </th>
                    <th className="text-left text-[10px] md:text-xs font-semibold text-gray-900 px-2 md:px-3 py-1 md:py-2">
                      Jan
                    </th>
                    <th className="text-left text-[10px] md:text-xs font-semibold text-gray-900 px-2 md:px-3 py-1 md:py-2">
                      Feb
                    </th>
                    <th className="text-left text-[10px] md:text-xs font-semibold text-gray-900 px-2 md:px-3 py-1 md:py-2">
                      Mar
                    </th>
                    <th className="text-left text-[10px] md:text-xs font-semibold text-gray-900 px-2 md:px-3 py-1 md:py-2">
                      Apr
                    </th>
                    <th className="text-left text-[10px] md:text-xs font-semibold text-gray-900 px-2 md:px-3 py-1 md:py-2">
                      May
                    </th>
                    <th className="text-left text-[10px] md:text-xs font-semibold text-gray-900 px-2 md:px-3 py-1 md:py-2">
                      Jun
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cohortAnalysisData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="text-[10px] md:text-xs font-medium text-gray-900 px-2 md:px-3 py-1 md:py-2">
                        {row.cohort}
                      </td>
                      <td className="text-[10px] md:text-xs text-gray-700 px-2 md:px-3 py-1 md:py-2">
                        <div className="flex items-center gap-1">
                          <div className="w-6 md:w-12 h-0.5 md:h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: "100%" }}
                            />
                          </div>
                          <span className="text-[10px]">{row.jan || "-"}</span>
                        </div>
                      </td>
                      <td className="text-[10px] md:text-xs text-gray-700 px-2 md:px-3 py-1 md:py-2">
                        <div className="flex items-center gap-1">
                          <div className="w-6 md:w-12 h-0.5 md:h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: row.feb ? `${(row.feb / 100) * 100}%` : "0%",
                              }}
                            />
                          </div>
                          <span className="text-[10px]">{row.feb || "-"}</span>
                        </div>
                      </td>
                      <td className="text-[10px] md:text-xs text-gray-700 px-2 md:px-3 py-1 md:py-2">
                        <div className="flex items-center gap-1">
                          <div className="w-6 md:w-12 h-0.5 md:h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: row.mar ? `${(row.mar / 100) * 100}%` : "0%",
                              }}
                            />
                          </div>
                          <span className="text-[10px]">{row.mar || "-"}</span>
                        </div>
                      </td>
                      <td className="text-[10px] md:text-xs text-gray-700 px-2 md:px-3 py-1 md:py-2">
                        <div className="flex items-center gap-1">
                          <div className="w-6 md:w-12 h-0.5 md:h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: row.apr ? `${(row.apr / 100) * 100}%` : "0%",
                              }}
                            />
                          </div>
                          <span className="text-[10px]">{row.apr || "-"}</span>
                        </div>
                      </td>
                      <td className="text-[10px] md:text-xs text-gray-700 px-2 md:px-3 py-1 md:py-2">
                        <div className="flex items-center gap-1">
                          <div className="w-6 md:w-12 h-0.5 md:h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: row.may ? `${(row.may / 100) * 100}%` : "0%",
                              }}
                            />
                          </div>
                          <span className="text-[10px]">{row.may || "-"}</span>
                        </div>
                      </td>
                      <td className="text-[10px] md:text-xs text-gray-700 px-2 md:px-3 py-1 md:py-2">
                        <div className="flex items-center gap-1">
                          <div className="w-6 md:w-12 h-0.5 md:h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{
                                width: row.jun ? `${(row.jun / 100) * 100}%` : "0%",
                              }}
                            />
                          </div>
                          <span className="text-[10px]">{row.jun || "-"}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
