import { useState } from "react";
import { Layout } from "@/components/Layout";
import AnalysisOverview from "./analysis/Overview";
import FinancialAnalysis from "./analysis/Financial";
import RevenueAnalysis from "./analysis/Revenue";
import ExpenseAnalysis from "./analysis/Expense";
import CashFlowAnalysis from "./analysis/CashFlow";
import CustomerAnalysis from "./analysis/Customer";
import VarianceAnalysis from "./analysis/Variance";
import BreakEvenAnalysis from "./analysis/BreakEven";
import RatioAnalysis from "./analysis/Ratio";
import TrendAnalysis from "./analysis/Trend";
import DepartmentAnalysis from "./analysis/Department";

interface Tab {
  id: string;
  label: string;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  { id: "overview", label: "Overview", component: AnalysisOverview },
  { id: "financial", label: "Financial Analysis", component: FinancialAnalysis },
  { id: "revenue", label: "Revenue Analysis", component: RevenueAnalysis },
  { id: "expense", label: "Expense Analysis", component: ExpenseAnalysis },
  { id: "cash-flow", label: "Cash Flow Analysis", component: CashFlowAnalysis },
  { id: "customer", label: "Customer Analysis", component: CustomerAnalysis },
  { id: "variance", label: "Variance Analysis", component: VarianceAnalysis },
  { id: "break-even", label: "Break-even Analysis", component: BreakEvenAnalysis },
  { id: "ratio", label: "Ratio Analysis", component: RatioAnalysis },
  { id: "trend", label: "Trend Analysis", component: TrendAnalysis },
  { id: "department", label: "Department Analysis", component: DepartmentAnalysis },
];

export default function Analysis() {
  const [activeTab, setActiveTab] = useState("overview");

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || AnalysisOverview;

  return (
    <Layout>
      <div className="flex-1 overflow-hidden flex flex-col bg-[#F6F8FA]">
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
          <ActiveComponent />
        </div>
      </div>
    </Layout>
  );
}
