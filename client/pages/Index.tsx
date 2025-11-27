import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { RevenueChart } from "@/components/RevenueChart";
import { ExpenseBreakdown } from "@/components/ExpenseBreakdown";
import { AccountBalances } from "@/components/AccountBalances";

// Dashboard page
export default function Index() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Welcome Message */}
          <div>
            <h1 className="text-[28px] font-semibold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-[14px] font-normal text-gray-600">
              Here's your financial overview for today.
            </p>
          </div>
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
