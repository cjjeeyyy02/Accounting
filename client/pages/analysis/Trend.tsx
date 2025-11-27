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

interface TrendMetric {
  label: string;
  trends: {
    period: string;
    value: string;
  }[];
}

interface ProjectionMetric {
  label: string;
  value: string;
  description: string;
  type: "positive" | "neutral";
}

const trendMetrics: TrendMetric[] = [
  {
    label: "Year-to-Date",
    trends: [
      { period: "Current", value: "7.2%" },
      { period: "Last Year", value: "1.2%" },
      { period: "Q1 Previous", value: "1.1%" },
      { period: "Earlier", value: "1%" },
    ],
  },
  {
    label: "Last 3 Year",
    trends: [
      { period: "Current", value: "6.1%" },
      { period: "Last Year", value: "1.8%" },
      { period: "2 Years Ago", value: "1.2%" },
      { period: "Earlier", value: "0.9%" },
    ],
  },
  {
    label: "Last 3 Month",
    trends: [
      { period: "Current", value: "8.5%" },
      { period: "Last Quarter", value: "2.1%" },
      { period: "Previous Q", value: "1.5%" },
      { period: "Earlier", value: "1.2%" },
    ],
  },
  {
    label: "Year-over-Year",
    trends: [
      { period: "Current", value: "5.8%" },
      { period: "Last Year", value: "1.6%" },
      { period: "Previous Year", value: "1.2%" },
      { period: "Earlier", value: "1.0%" },
    ],
  },
];

const yearOverYearData = [
  { month: "Jan", "2023": 42000, "2022": 38000, "2021": 35000 },
  { month: "Feb", "2023": 45000, "2022": 40000, "2021": 37000 },
  { month: "Mar", "2023": 48000, "2022": 42000, "2021": 39000 },
  { month: "Apr", "2023": 50000, "2022": 44000, "2021": 41000 },
  { month: "May", "2023": 52000, "2022": 46000, "2021": 43000 },
  { month: "Jun", "2023": 54000, "2022": 48000, "2021": 45000 },
];

const monthlyTrendData = [
  { day: "1", revenue: 45000 },
  { day: "5", revenue: 46500 },
  { day: "10", revenue: 47800 },
  { day: "15", revenue: 48200 },
  { day: "20", revenue: 49100 },
  { day: "25", revenue: 50000 },
  { day: "30", revenue: 51500 },
];

const projections: ProjectionMetric[] = [
  {
    label: "Base Revenue",
    value: "$113.9k",
    description: "Last Month",
    type: "positive",
  },
  {
    label: "Q2 Revenue",
    value: "$1 Billion",
    description: "Forecasted",
    type: "positive",
  },
  {
    label: "Year-end Revenue",
    value: "$350k",
    description: "Final Quarter",
    type: "positive",
  },
  {
    label: "Annual Growth Rate",
    value: "28.5%",
    description: "Final 12m",
    type: "positive",
  },
];

export default function TrendAnalysis() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Trend Analysis
              </h1>
              <p className="text-gray-600">
                Historical data analysis and trend forecasting
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Download size={16} />
              Export Report
            </Button>
          </div>

          {/* Trend Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {trendMetrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  {metric.label}
                </p>
                <div className="space-y-3">
                  {metric.trends.map((trend) => (
                    <div key={trend.period} className="flex justify-between items-center">
                      <p className="text-xs text-gray-600">{trend.period}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {trend.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Year-over-Year Revenue Comparison */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Year-over-Year Revenue Comparison
              </h2>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearOverYearData}>
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
                <Line
                  type="monotone"
                  dataKey="2023"
                  stroke="#3b82f6"
                  dot={false}
                  strokeWidth={2}
                  name="2023"
                />
                <Line
                  type="monotone"
                  dataKey="2022"
                  stroke="#10b981"
                  dot={false}
                  strokeWidth={2}
                  name="2022"
                />
                <Line
                  type="monotone"
                  dataKey="2021"
                  stroke="#a855f7"
                  dot={false}
                  strokeWidth={2}
                  name="2021"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Monthly Trend Last 1 Month
            </h2>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" label={{ value: "Day of Month", position: "insideBottomRight", offset: -5 }} />
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
                  dataKey="revenue"
                  stroke="#10b981"
                  dot={false}
                  strokeWidth={2}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Projections */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Revenue Projections
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projections.map((projection) => (
                <div
                  key={projection.label}
                  className="border-l-4 border-blue-600 pl-6"
                >
                  <p className="text-sm text-gray-600 mb-2">{projection.label}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {projection.value}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    {projection.description}
                    <span className="text-blue-600 cursor-pointer hover:underline">
                      View Details
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
