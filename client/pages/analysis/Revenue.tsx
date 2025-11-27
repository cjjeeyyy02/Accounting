import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, Filter } from "lucide-react";
import {
  AreaChart,
  Area,
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
}

interface Customer {
  name: string;
  revenue: string;
  percentage: number;
}

const metricCards: MetricCard[] = [
  {
    label: "Total Revenue",
    value: "$326k",
  },
  {
    label: "Monthly Revenue",
    value: "$34.7k",
  },
  {
    label: "Growth Rate",
    value: "+12.8%",
    change: 3.2,
    isPositive: true,
  },
  {
    label: "Avg Transaction",
    value: "$45k",
  },
];

const revenueBySourceData = [
  { month: "Jan", direct: 4000, online: 3000, partner: 2000, other: 1500 },
  { month: "Feb", direct: 4200, online: 3200, partner: 2100, other: 1600 },
  { month: "Mar", direct: 4400, online: 3400, partner: 2200, other: 1700 },
  { month: "Apr", direct: 4600, online: 3600, partner: 2300, other: 1800 },
  { month: "May", direct: 4800, online: 3800, partner: 2400, other: 1900 },
];

const revenueByChannelData = [
  { name: "Direct Sales", value: 35, color: "#3b82f6" },
  { name: "Online", value: 28, color: "#a855f7" },
  { name: "Partners", value: 22, color: "#ec4899" },
  { name: "Other", value: 15, color: "#06b6d4" },
];

const topCustomers: Customer[] = [
  { name: "Acme Corp", revenue: "$45,230", percentage: 15 },
  { name: "TechFlow Inc", revenue: "$38,500", percentage: 13 },
  { name: "Global Solutions", revenue: "$32,100", percentage: 11 },
  { name: "Digital Ventures", revenue: "$28,750", percentage: 9 },
  { name: "NextGen Systems", revenue: "$22,400", percentage: 7 },
  { name: "Innovation Labs", revenue: "$18,900", percentage: 6 },
];

export default function RevenueAnalysis() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Revenue Analysis
              </h1>
              <p className="text-gray-600">
                Revenue trends, customer insights, and growth patterns
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
                {card.change !== undefined && (
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
                      {card.change}% from last period
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Revenue by Source Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Revenue by Source
              </h2>
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueBySourceData}>
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
                <Area
                  type="monotone"
                  dataKey="direct"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  name="Direct"
                />
                <Area
                  type="monotone"
                  dataKey="online"
                  stackId="1"
                  stroke="#a855f7"
                  fill="#a855f7"
                  name="Online"
                />
                <Area
                  type="monotone"
                  dataKey="partner"
                  stackId="1"
                  stroke="#ec4899"
                  fill="#ec4899"
                  name="Partner"
                />
                <Area
                  type="monotone"
                  dataKey="other"
                  stackId="1"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  name="Other"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Channel & Top Customers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue by Channel - Donut Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Revenue by Channel
              </h2>

              <div className="flex items-center justify-between">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueByChannelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {revenueByChannelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex-1 pl-6 space-y-3">
                  {revenueByChannelData.map((channel) => (
                    <div key={channel.name} className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: channel.color }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {channel.name}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {channel.value}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Customers */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Top Customers
              </h2>

              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-b-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {customer.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${customer.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {customer.percentage}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {customer.revenue}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
