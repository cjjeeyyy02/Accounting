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

interface Category {
  name: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
}

interface DepartmentPerformance {
  name: string;
  budgeted: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: "favorable" | "unfavorable";
}

const metricCards: MetricCard[] = [
  {
    label: "Budget Variance",
    value: "$635k",
  },
  {
    label: "Actual Variance",
    value: "$610k",
  },
  {
    label: "Performance Variance",
    value: "0.8%",
    change: 0.8,
    isPositive: true,
  },
];

const categoryAnalysis: Category[] = [
  {
    name: "Grocery",
    budgeted: 45000,
    actual: 42000,
    variance: 3000,
    variancePercent: 6.7,
  },
  {
    name: "Supplies",
    budgeted: 38000,
    actual: 40500,
    variance: -2500,
    variancePercent: -6.6,
  },
  {
    name: "Electronics",
    budgeted: 52000,
    actual: 50800,
    variance: 1200,
    variancePercent: 2.3,
  },
  {
    name: "Sales",
    budgeted: 60000,
    actual: 61200,
    variance: -1200,
    variancePercent: -2.0,
  },
  {
    name: "Revenue",
    budgeted: 75000,
    actual: 73500,
    variance: 1500,
    variancePercent: 2.0,
  },
  {
    name: "Marketing",
    budgeted: 48000,
    actual: 50000,
    variance: -2000,
    variancePercent: -4.2,
  },
];

const monthlyVarianceData = [
  { month: "Jan", variance: 5000 },
  { month: "Feb", variance: 0 },
  { month: "Mar", variance: 8000 },
  { month: "Apr", variance: 0 },
  { month: "May", variance: 6500 },
  { month: "Jun", variance: 0 },
];

const departmentPerformance: DepartmentPerformance[] = [
  {
    name: "Sales",
    budgeted: 120000,
    actual: 124000,
    variance: -4000,
    variancePercent: -3.33,
    status: "unfavorable",
  },
  {
    name: "Engineering",
    budgeted: 180000,
    actual: 175000,
    variance: 5000,
    variancePercent: 2.78,
    status: "favorable",
  },
  {
    name: "Marketing",
    budgeted: 85000,
    actual: 87500,
    variance: -2500,
    variancePercent: -2.94,
    status: "unfavorable",
  },
  {
    name: "Operations",
    budgeted: 95000,
    actual: 93000,
    variance: 2000,
    variancePercent: 2.11,
    status: "favorable",
  },
];

export default function VarianceAnalysis() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-4 md:mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                Variance Analysis
              </h1>
              <p className="text-xs md:text-sm text-gray-600">
                Actual vs budget comparison and performance gaps
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-xs md:text-sm h-8 md:h-10">
              <Download size={14} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-gray-200 p-3 md:p-4"
              >
                <p className="text-xs md:text-sm text-gray-600 mb-1">{card.label}</p>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {card.value}
                </h3>
                {card.change !== undefined && (
                  <div className="flex items-center gap-1">
                    {card.isPositive ? (
                      <TrendingUp size={14} className="text-green-600" />
                    ) : (
                      <TrendingDown size={14} className="text-red-600" />
                    )}
                    <span
                      className={`text-xs md:text-sm font-medium ${
                        card.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {card.isPositive ? "+" : ""}
                      {card.change}% performance
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Category Analysis */}
          <div className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
              Category Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {categoryAnalysis.map((category) => (
                <div
                  key={category.name}
                  className="bg-white rounded-lg border border-gray-200 p-3 md:p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs md:text-sm text-gray-600 mb-1">{category.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Budget: ${(category.budgeted / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <span
                      className={`text-xs md:text-sm font-semibold px-2 py-1 rounded ${
                        category.variance >= 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.variance >= 0 ? "+" : ""}
                      {category.variancePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-700">Actual</span>
                      <span className="font-semibold text-gray-900">
                        ${(category.actual / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-700">Variance</span>
                      <span
                        className={`font-semibold ${
                          category.variance >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {category.variance >= 0 ? "+" : ""}${(category.variance / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Variance Trend */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                Monthly Variance Trend
              </h2>
              <button className="flex items-center gap-2 px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={14} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={150} minHeight={150}>
              <BarChart data={monthlyVarianceData}>
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
                <Bar dataKey="variance" fill="#3b82f6" name="Variance" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Performance */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
              Department Performance
            </h2>

            <div className="space-y-3 md:space-y-4">
              {departmentPerformance.map((dept) => (
                <div key={dept.name} className="pb-3 md:pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div>
                      <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
                        {dept.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        Budget: ${(dept.budgeted / 1000).toFixed(0)}k | Actual: ${(dept.actual / 1000).toFixed(0)}k
                      </p>
                    </div>
                    <span
                      className={`text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded ${
                        dept.status === "favorable"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dept.variancePercent >= 0 ? "+" : ""}
                      {dept.variancePercent.toFixed(2)}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="flex-1">
                      <div className="h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            dept.status === "favorable"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                          style={{
                            width: `${Math.min(
                              Math.abs(dept.variancePercent) * 2,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {dept.variance >= 0 ? "+" : ""}${(dept.variance / 1000).toFixed(1)}k
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
