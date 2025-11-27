import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { RevenueChart } from "@/components/RevenueChart";
import { ExpenseBreakdown } from "@/components/ExpenseBreakdown";
import { AccountBalances } from "@/components/AccountBalances";
import { Bell, Settings } from "lucide-react";

// Dashboard page
export default function Index() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">
                  Welcome back! Here's your financial overview.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell size={24} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings size={24} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total Balance"
              value="$328,000"
              change={12.5}
              isPositive={true}
              accentColor="blue"
            />
            <StatCard
              label="Monthly Expenses"
              value="$110,000"
              change={-3.2}
              isPositive={false}
              accentColor="red"
            />
            <StatCard
              label="Income"
              value="$210,000"
              change={8.7}
              isPositive={true}
              accentColor="green"
            />
            <StatCard
              label="Growth Rate"
              value="66.5%"
              change={5.4}
              isPositive={true}
              accentColor="purple"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <ExpenseBreakdown />
          </div>

          {/* Account Balances */}
          <AccountBalances />
        </div>
      </div>
    </Layout>
  );
}
