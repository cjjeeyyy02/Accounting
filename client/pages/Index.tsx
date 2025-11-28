import { Layout } from "@/components/Layout";
import { TrendingUp, TrendingDown, DollarSign, Zap, Wallet, PiggyBank, BarChart3, Coins, Building2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Chart data
const revenueData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 52000 },
  { month: "Mar", value: 48000 },
  { month: "Apr", value: 61000 },
  { month: "May", value: 55000 },
  { month: "Jun", value: 70000 },
];

const expenditureData = [
  { month: "Jan", value: 32000 },
  { month: "Feb", value: 38000 },
  { month: "Mar", value: 35000 },
  { month: "Apr", value: 42000 },
  { month: "May", value: 40000 },
  { month: "Jun", value: 45000 },
];

interface MetricCardProps {
  label: string;
  value: string;
  growth: number;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, growth, isPositive, icon }) => (
  <div className="bg-white rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-5 flex items-center gap-4 hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-shadow">
    <div className="flex-shrink-0 text-[#2E5AAC]">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-[12px] font-medium text-[#7A7A7A] mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-[#2E5AAC] mb-2">{value}</h3>
      <div className="flex items-center gap-1">
        {isPositive ? (
          <TrendingUp size={14} className="text-[#10B981]" />
        ) : (
          <TrendingDown size={14} className="text-[#EF4444]" />
        )}
        <span className={`text-xs font-medium ${isPositive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
          {isPositive ? "+" : ""}{growth}% vs last month
        </span>
      </div>
    </div>
  </div>
);

interface HighlightItemProps {
  number: number;
  text: string;
  colors: { bg: string; text: string };
}

const HighlightItem: React.FC<HighlightItemProps> = ({ number, text, colors }) => (
  <div className="flex items-start gap-4 pb-4 border-b border-[#E5E7EB] last:border-b-0">
    <div className={`${colors.bg} ${colors.text} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
      {number}
    </div>
    <p className="text-[13px] text-[#4C4C4C] leading-relaxed flex-1">{text}</p>
  </div>
);

interface AccountCardProps {
  label: string;
  value: string;
  growth: number;
  isPositive: boolean;
  icon: React.ReactNode;
}

const AccountCard: React.FC<AccountCardProps> = ({ label, value, growth, isPositive, icon }) => (
  <div className="bg-white rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-4 flex flex-col items-center justify-center hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-shadow">
    <div className="text-[#2E5AAC] mb-3">
      {icon}
    </div>
    <p className="text-[11px] font-medium text-[#7A7A7A] mb-2 text-center">{label}</p>
    <h3 className="text-xl font-bold text-[#2E5AAC] mb-2">{value}</h3>
    <div className="flex items-center gap-1">
      {isPositive ? (
        <TrendingUp size={12} className="text-[#10B981]" />
      ) : (
        <TrendingDown size={12} className="text-[#EF4444]" />
      )}
      <span className={`text-xs font-medium ${isPositive ? "text-[#10B981]" : "text-[#EF4444]"}`}>
        {isPositive ? "+" : ""}{growth}%
      </span>
    </div>
  </div>
);

export default function Index() {
  return (
    <Layout>
      <div className="bg-white min-h-screen">
        {/* Main Container with padding */}
        <div className="p-6 max-w-7xl mx-auto">
          {/* TOP SECTION - METRIC CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              label="Total Revenue"
              value="$328,000"
              growth={12.5}
              isPositive={true}
              icon={<DollarSign size={32} />}
            />
            <MetricCard
              label="Monthly Expenses"
              value="$110,000"
              growth={-3.2}
              isPositive={false}
              icon={<TrendingDown size={32} />}
            />
            <MetricCard
              label="Income"
              value="$210,000"
              growth={8.7}
              isPositive={true}
              icon={<Zap size={32} />}
            />
            <MetricCard
              label="Growth Rate"
              value="66.5%"
              growth={5.4}
              isPositive={true}
              icon={<TrendingUp size={32} />}
            />
          </div>

          {/* MIDDLE SECTION - TWO COLUMNS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* LEFT COLUMN - FINANCIAL HIGHLIGHTS */}
            <div className="lg:col-span-1 bg-white rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-lg font-semibold text-[#2E5AAC] mb-6">Financial Highlights & Key Updates</h2>
              <div className="space-y-4">
                <HighlightItem
                  number={1}
                  text="Achieved a 15% increase in revenue year-over-year."
                  colors={{ bg: "bg-[#2E5AAC]", text: "text-white" }}
                />
                <HighlightItem
                  number={2}
                  text="Contributing to a 10% rise in market share."
                  colors={{ bg: "bg-[#EF4444]", text: "text-white" }}
                />
                <HighlightItem
                  number={3}
                  text="Revenue hit $10 million (up from $8.7 million last year)."
                  colors={{ bg: "bg-[#10B981]", text: "text-white" }}
                />
                <HighlightItem
                  number={4}
                  text="Achieved a 15% increase in income this month."
                  colors={{ bg: "bg-[#F59E0B]", text: "text-white" }}
                />
              </div>
            </div>

            {/* RIGHT COLUMN - REVENUE ANALYSIS */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title with yellow highlight */}
              <div>
                <h2 className="text-2xl font-bold">
                  <span className="bg-yellow-300 px-1">Revenue</span> Analysis
                </h2>
              </div>

              {/* Annual Revenue Trend Chart */}
              <div className="bg-white rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                <h3 className="text-sm font-semibold text-[#2E5AAC] mb-4">Annual Revenue Trend Chart</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#7A7A7A" />
                    <YAxis stroke="#7A7A7A" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      dot={false}
                      strokeWidth={2}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Annual Expenditure Trend Chart */}
              <div className="bg-white rounded-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
                <h3 className="text-sm font-semibold text-[#2E5AAC] mb-4">Annual Expenditure Trend Chart</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={expenditureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#7A7A7A" />
                    <YAxis stroke="#7A7A7A" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                      }}
                      formatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6B7280"
                      dot={false}
                      strokeWidth={2}
                      name="Expenditure"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION - ACCOUNT BALANCES */}
          <div>
            <h2 className="text-lg font-semibold text-[#2E5AAC] mb-6">Account Balances</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <AccountCard
                label="Checking"
                value="$245k"
                growth={2.5}
                isPositive={true}
                icon={<Wallet size={28} />}
              />
              <AccountCard
                label="Savings"
                value="$125k"
                growth={-1.2}
                isPositive={false}
                icon={<PiggyBank size={28} />}
              />
              <AccountCard
                label="Investment"
                value="$90k"
                growth={5.8}
                isPositive={true}
                icon={<BarChart3 size={28} />}
              />
              <AccountCard
                label="Crypto"
                value="$355k"
                growth={12.3}
                isPositive={true}
                icon={<Coins size={28} />}
              />
              <AccountCard
                label="Assets"
                value="$520k"
                growth={1.4}
                isPositive={true}
                icon={<Building2 size={28} />}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
