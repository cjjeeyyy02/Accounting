import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

interface MetricCard {
  label: string;
  value: string;
  status?: string;
}

interface DepartmentPerformance {
  department: string;
  headcount: number;
  budget: number;
  spent: number;
  efficiency: number;
}

interface ComparativeData {
  metric: string;
  Engineering: number;
  Sales: number;
  Marketing: number;
  Operations: number;
}

const metricCards: MetricCard[] = [
  {
    label: "Total Departments",
    value: "68",
  },
  {
    label: "Average Budget",
    value: "$4,624",
  },
  {
    label: "Status",
    value: "Active",
    status: "Active",
  },
  {
    label: "Total Spend",
    value: "$230k",
  },
];

const departmentPerformanceData: DepartmentPerformance[] = [
  { department: "Engineering", headcount: 45, budget: 180000, spent: 175000, efficiency: 97 },
  { department: "Sales", headcount: 32, budget: 120000, spent: 124000, efficiency: 96 },
  { department: "Marketing", headcount: 18, budget: 85000, spent: 87500, efficiency: 97 },
  { department: "Operations", headcount: 28, budget: 95000, spent: 93000, efficiency: 98 },
  { department: "HR", headcount: 12, budget: 65000, spent: 64000, efficiency: 98 },
];

const comparativePerformanceData: ComparativeData[] = [
  { metric: "Productivity", Engineering: 92, Sales: 88, Marketing: 85, Operations: 90 },
  { metric: "Efficiency", Engineering: 88, Sales: 82, Marketing: 80, Operations: 92 },
  { metric: "Utilization", Engineering: 85, Sales: 90, Marketing: 88, Operations: 87 },
  { metric: "Growth", Engineering: 90, Sales: 94, Marketing: 86, Operations: 84 },
  { metric: "Innovation", Engineering: 95, Sales: 80, Marketing: 92, Operations: 78 },
  { metric: "Retention", Engineering: 88, Sales: 85, Marketing: 90, Operations: 92 },
];

const departmentExpenseData = [
  { name: "Engineering", amount: 175000 },
  { name: "Sales", amount: 124000 },
  { name: "Marketing", amount: 87500 },
  { name: "Operations", amount: 93000 },
  { name: "HR", amount: 64000 },
];

export default function DepartmentAnalysis() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Department Analysis
              </h1>
              <p className="text-gray-600">
                Operational efficiency and department-wise metrics
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Download size={16} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <p className="text-sm text-gray-600 mb-2">{card.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {card.value}
                </h3>
                {card.status === "Active" && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                    <span className="text-sm font-medium text-green-600">
                      {card.status}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Department Performance Table */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Department Performance
              </h2>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Department
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Headcount
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Budget
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Spent
                    </th>
                    <th className="text-left text-sm font-semibold text-gray-900 px-4 py-3">
                      Efficiency
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departmentPerformanceData.map((dept, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="text-sm font-medium text-gray-900 px-4 py-3">
                        {dept.department}
                      </td>
                      <td className="text-sm text-gray-700 px-4 py-3">
                        {dept.headcount}
                      </td>
                      <td className="text-sm text-gray-700 px-4 py-3">
                        ${(dept.budget / 1000).toFixed(0)}k
                      </td>
                      <td className="text-sm text-gray-700 px-4 py-3">
                        ${(dept.spent / 1000).toFixed(0)}k
                      </td>
                      <td className="text-sm px-4 py-3">
                        <span className="font-semibold text-green-600">
                          {dept.efficiency}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparative Performance Radar Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Comparative Performance
            </h2>

            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={comparativePerformanceData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar
                  name="Engineering"
                  dataKey="Engineering"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.25}
                />
                <Radar
                  name="Sales"
                  dataKey="Sales"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.25}
                />
                <Radar
                  name="Marketing"
                  dataKey="Marketing"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.25}
                />
                <Radar
                  name="Operations"
                  dataKey="Operations"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.25}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Department Expense Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Department Expense Breakdown
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={departmentExpenseData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" stroke="#6b7280" width={180} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill="#3b82f6" name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
