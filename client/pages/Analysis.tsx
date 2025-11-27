import { useState } from "react";
import { Layout } from "@/components/Layout";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

// Lazy load the tab contents
const tabs: Tab[] = [
  { id: "overview", label: "Overview", content: null },
  { id: "financial", label: "Financial Analysis", content: null },
  { id: "revenue", label: "Revenue Analysis", content: null },
  { id: "expense", label: "Expense Analysis", content: null },
  { id: "cash-flow", label: "Cash Flow Analysis", content: null },
  { id: "customer", label: "Customer Analysis", content: null },
  { id: "variance", label: "Variance Analysis", content: null },
  { id: "break-even", label: "Break-even Analysis", content: null },
  { id: "ratio", label: "Ratio Analysis", content: null },
  { id: "trend", label: "Trend Analysis", content: null },
  { id: "department", label: "Department Analysis", content: null },
];

// Content renderers that don't include Layout
function OverviewContent() {
  const OverviewPage = require("./analysis/Overview").default;
  return <OverviewPage />;
}

function FinancialContent() {
  const FinancialPage = require("./analysis/Financial").default;
  return <FinancialPage />;
}

function RevenueContent() {
  const RevenuePage = require("./analysis/Revenue").default;
  return <RevenuePage />;
}

function ExpenseContent() {
  const ExpensePage = require("./analysis/Expense").default;
  return <ExpensePage />;
}

function CashFlowContent() {
  const CashFlowPage = require("./analysis/CashFlow").default;
  return <CashFlowPage />;
}

function CustomerContent() {
  const CustomerPage = require("./analysis/Customer").default;
  return <CustomerPage />;
}

function VarianceContent() {
  const VariancePage = require("./analysis/Variance").default;
  return <VariancePage />;
}

function BreakEvenContent() {
  const BreakEvenPage = require("./analysis/BreakEven").default;
  return <BreakEvenPage />;
}

function RatioContent() {
  const RatioPage = require("./analysis/Ratio").default;
  return <RatioPage />;
}

function TrendContent() {
  const TrendPage = require("./analysis/Trend").default;
  return <TrendPage />;
}

function DepartmentContent() {
  const DepartmentPage = require("./analysis/Department").default;
  return <DepartmentPage />;
}

const contentMap: { [key: string]: React.ComponentType } = {
  overview: OverviewContent,
  financial: FinancialContent,
  revenue: RevenueContent,
  expense: ExpenseContent,
  "cash-flow": CashFlowContent,
  customer: CustomerContent,
  variance: VarianceContent,
  "break-even": BreakEvenContent,
  ratio: RatioContent,
  trend: TrendContent,
  department: DepartmentContent,
};

export default function Analysis() {
  const [activeTab, setActiveTab] = useState("overview");

  const ContentComponent = contentMap[activeTab] || OverviewContent;

  return (
    <Layout>
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Tabs Navigation */}
        <div className="bg-white border-b border-[#E5E7EB] shadow-sm">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 px-4 sm:px-6 lg:px-8 py-0 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "border-b-[#2E5AAC] text-[#2E5AAC]"
                      : "border-b-transparent text-[#7A7A7A] hover:text-[#2E5AAC] hover:border-b-[#E5E7EB]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto">
          <ContentComponent />
        </div>
      </div>
    </Layout>
  );
}
