import { useState } from "react";
import { Layout } from "@/components/Layout";
import AnalysisOverviewPage from "./analysis/Overview";
import { FinancialAnalysisContent } from "./analysis/Financial";
import RevenueAnalysisPage from "./analysis/Revenue";
import ExpenseAnalysisPage from "./analysis/Expense";
import CashFlowAnalysisPage from "./analysis/CashFlow";
import CustomerAnalysisPage from "./analysis/Customer";
import VarianceAnalysisPage from "./analysis/Variance";
import BreakEvenAnalysisPage from "./analysis/BreakEven";
import RatioAnalysisPage from "./analysis/Ratio";
import TrendAnalysisPage from "./analysis/Trend";
import DepartmentAnalysisPage from "./analysis/Department";

interface Tab {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "overview",
    label: "Overview",
    render: () => {
      const Page = AnalysisOverviewPage;
      return <Page />;
    },
  },
  {
    id: "financial",
    label: "Financial Analysis",
    render: () => <FinancialAnalysisContent />,
  },
  {
    id: "revenue",
    label: "Revenue Analysis",
    render: () => {
      const Page = RevenueAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "expense",
    label: "Expense Analysis",
    render: () => {
      const Page = ExpenseAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "cash-flow",
    label: "Cash Flow Analysis",
    render: () => {
      const Page = CashFlowAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "customer",
    label: "Customer Analysis",
    render: () => {
      const Page = CustomerAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "variance",
    label: "Variance Analysis",
    render: () => {
      const Page = VarianceAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "break-even",
    label: "Break-even Analysis",
    render: () => {
      const Page = BreakEvenAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "ratio",
    label: "Ratio Analysis",
    render: () => {
      const Page = RatioAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "trend",
    label: "Trend Analysis",
    render: () => {
      const Page = TrendAnalysisPage;
      return <Page />;
    },
  },
  {
    id: "department",
    label: "Department Analysis",
    render: () => {
      const Page = DepartmentAnalysisPage;
      return <Page />;
    },
  },
];

export default function Analysis() {
  const [activeTab, setActiveTab] = useState("overview");

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

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
          {activeTabData.render()}
        </div>
      </div>
    </Layout>
  );
}
