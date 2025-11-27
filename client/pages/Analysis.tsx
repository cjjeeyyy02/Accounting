import { useState } from "react";
import { Layout } from "@/components/Layout";
import { AnalysisOverviewContent } from "./analysis/Overview";
import { FinancialAnalysisContent } from "./analysis/Financial";
import RevenuePage from "./analysis/Revenue";
import ExpensePage from "./analysis/Expense";
import CashFlowPage from "./analysis/CashFlow";
import CustomerPage from "./analysis/Customer";
import VariancePage from "./analysis/Variance";
import BreakEvenPage from "./analysis/BreakEven";
import RatioPage from "./analysis/Ratio";
import TrendPage from "./analysis/Trend";
import DepartmentPage from "./analysis/Department";

interface Tab {
  id: string;
  label: string;
  Component: React.ComponentType;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview", Component: AnalysisOverviewContent },
  { id: "financial", label: "Financial Analysis", Component: FinancialAnalysisContent },
  { id: "revenue", label: "Revenue Analysis", Component: RevenuePage },
  { id: "expense", label: "Expense Analysis", Component: ExpensePage },
  { id: "cash-flow", label: "Cash Flow Analysis", Component: CashFlowPage },
  { id: "customer", label: "Customer Analysis", Component: CustomerPage },
  { id: "variance", label: "Variance Analysis", Component: VariancePage },
  { id: "break-even", label: "Break-even Analysis", Component: BreakEvenPage },
  { id: "ratio", label: "Ratio Analysis", Component: RatioPage },
  { id: "trend", label: "Trend Analysis", Component: TrendPage },
  { id: "department", label: "Department Analysis", Component: DepartmentPage },
];

export default function Analysis() {
  const [activeTab, setActiveTab] = useState("overview");

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const ActiveComponent = activeTabData.Component;

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

        {/* Tab Content - Render without wrapper div to prevent Layout nesting */}
        <ActiveComponent />
      </div>
    </Layout>
  );
}
