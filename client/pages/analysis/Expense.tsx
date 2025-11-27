import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Filter, AlertCircle, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
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
  status?: string;
}

interface Department {
  name: string;
  budgeted: number;
  spent: number;
  percentage: number;
  status: "on-track" | "warning" | "over-budget";
}

const metricCards: MetricCard[] = [
  {
    label: "Total Expenses",
    value: "$388.8k",
  },
  {
    label: "Expense Ratio",
    value: "$64.3k",
  },
  {
    label: "Salaries",
    value: "Salaries",
    status: "On Track",
  },
];

const monthlyExpenseData = [
  { month: "Jan", salary: 45000, utilities: 8000, supplies: 5000, other: 3000 },
  { month: "Feb", salary: 45000, utilities: 8200, supplies: 5200, other: 3100 },
  { month: "Mar", salary: 45000, utilities: 8400, supplies: 5400, other: 3200 },
  { month: "Apr", salary: 45000, utilities: 8600, supplies: 5600, other: 3300 },
  { month: "May", salary: 45000, utilities: 8800, supplies: 5800, other: 3400 },
  { month: "Jun", salary: 45000, utilities: 9000, supplies: 6000, other: 3500 },
];

const expenseDistributionData = [
  { name: "Salaries", value: 48, color: "#3b82f6" },
  { name: "Utilities", value: 18, color: "#a855f7" },
  { name: "Supplies", value: 20, color: "#ec4899" },
  { name: "Other", value: 14, color: "#06b6d4" },
];

const departmentBudgets: Department[] = [
  {
    name: "Engineering",
    budgeted: 150000,
    spent: 128000,
    percentage: 85,
    status: "on-track",
  },
  {
    name: "Sales",
    budgeted: 80000,
    spent: 72000,
    percentage: 90,
    status: "on-track",
  },
  {
    name: "Operations",
    budgeted: 60000,
    spent: 58000,
    percentage: 97,
    status: "warning",
  },
  {
    name: "Marketing",
    budgeted: 50000,
    spent: 56000,
    percentage: 112,
    status: "over-budget",
  },
  {
    name: "HR",
    budgeted: 40000,
    spent: 35000,
    percentage: 88,
    status: "on-track",
  },
  {
    name: "Finance",
    budgeted: 35000,
    spent: 32000,
    percentage: 91,
    status: "on-track",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-track":
      return "text-green-600 bg-green-50";
    case "warning":
      return "text-yellow-600 bg-yellow-50";
    case "over-budget":
      return "text-red-600 bg-red-50";
    default:
      return "text-[#7A7A7A] bg-gray-50";
  }
};

const getStatusIcon = (status: string) => {
  if (status === "on-track") {
    return <CheckCircle size={16} className="text-green-600" />;
  } else {
    return <AlertCircle size={16} className="text-red-600" />;
  }
};

function ExpenseAnalysisContent() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-3 md:p-4 bg-[#F6F8FA] min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h1 className="text-lg md:text-xl font-semibold text-[#2E5AAC] mb-1">
                Expense Analysis
              </h1>
              <p className="text-[11px] md:text-[12px] font-normal text-[#7A7A7A]">
                Spending patterns, category breakdown, and optimization
              </p>
            </div>
            <Button className="bg-[#2E5AAC] hover:bg-[#1E3F7A] flex items-center gap-2 text-[11px] md:text-xs h-7 md:h-8">
              <Download size={13} />
              Export Report
            </Button>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 mb-3">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="bg-white rounded-lg border border-[#E5E7EB] p-3"
              >
                <p className="text-[11px] md:text-xs text-[#7A7A7A] mb-1">{card.label}</p>
                <h3 className="text-base md:text-lg font-bold text-[#2E5AAC] mb-1">
                  {card.value}
                </h3>
                {card.status && (
                  <div className="flex items-center gap-1">
                    <CheckCircle size={13} className="text-green-600" />
                    <span className="text-[11px] md:text-xs font-medium text-green-600">
                      {card.status}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Monthly Expense Breakdown Chart */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4 mb-3">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC]">
                Monthly Expense Breakdown
              </h2>
              <button className="flex items-center gap-2 px-2 md:px-3 py-1 text-[11px] md:text-xs text-[#7A7A7A] hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={13} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={120} minHeight={120}>
              <BarChart data={monthlyExpenseData}>
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
                <Bar dataKey="salary" stackId="a" fill="#3b82f6" name="Salary" />
                <Bar dataKey="utilities" stackId="a" fill="#a855f7" name="Utilities" />
                <Bar dataKey="supplies" stackId="a" fill="#ec4899" name="Supplies" />
                <Bar dataKey="other" stackId="a" fill="#06b6d4" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Distribution & Department Budget Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {/* Expense Distribution - Donut Chart */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4">
              <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2">
                Expense Distribution
              </h2>

              <div className="flex items-center justify-between">
                <div className="w-24 h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={45}
                        paddingAngle={1}
                        dataKey="value"
                      >
                        {expenseDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 pl-3 space-y-1">
                  {expenseDistributionData.map((expense) => (
                    <div key={expense.name} className="flex items-center gap-1">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: expense.color }}
                      />
                      <div className="flex-1">
                        <p className="text-[10px] md:text-xs font-medium text-[#2E5AAC]">
                          {expense.name}
                        </p>
                      </div>
                      <p className="text-[10px] md:text-xs font-semibold text-[#2E5AAC]">
                        {expense.value}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Department Budget Status */}
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-3 md:p-4">
              <h2 className="text-sm md:text-base font-semibold text-[#2E5AAC] mb-2">
                Department Budget Status
              </h2>

              <div className="space-y-2">
                {departmentBudgets.map((dept, index) => (
                  <div key={index} className="pb-2 border-b border-[#E5E7EB] last:border-b-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1">
                        {getStatusIcon(dept.status)}
                        <p className="text-[11px] md:text-xs font-medium text-[#2E5AAC]">
                          {dept.name}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] md:text-[11px] font-semibold px-2 py-0.5 rounded ${getStatusColor(
                          dept.status
                        )}`}
                      >
                        {dept.percentage}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            dept.status === "on-track"
                              ? "bg-green-600"
                              : dept.status === "warning"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                          }`}
                          style={{ width: `${Math.min(dept.percentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#7A7A7A] whitespace-nowrap">
                        ${(dept.spent / 1000).toFixed(0)}k / ${(dept.budgeted / 1000).toFixed(0)}k
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

function ExpenseAnalysis() {
  return (
    <Layout>
      <ExpenseAnalysisContent />
    </Layout>
  );
}

export default ExpenseAnalysis;
export { ExpenseAnalysisContent };
