import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/SidebarContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Analysis from "./pages/Analysis";
import Charts from "./pages/Charts";
import Trends from "./pages/Trends";
import Customers from "./pages/Customers";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Invoices from "./pages/Invoices";
import CustomersVendors from "./pages/CustomersVendors";
import Inventory from "./pages/Inventory";
import Budget from "./pages/Budget";
import UploadCenter from "./pages/UploadCenter";
import AnalysisOverview from "./pages/analysis/Overview";
import FinancialAnalysis from "./pages/analysis/Financial";
import RevenueAnalysis from "./pages/analysis/Revenue";
import ExpenseAnalysis from "./pages/analysis/Expense";
import CashFlowAnalysis from "./pages/analysis/CashFlow";
import CustomerAnalysis from "./pages/analysis/Customer";
import VarianceAnalysis from "./pages/analysis/Variance";
import BreakEvenAnalysis from "./pages/analysis/BreakEven";
import RatioAnalysis from "./pages/analysis/Ratio";
import TrendAnalysis from "./pages/analysis/Trend";
import DepartmentAnalysis from "./pages/analysis/Department";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/analysis/overview" element={<AnalysisOverview />} />
          <Route path="/analysis/financial" element={<FinancialAnalysis />} />
          <Route path="/analysis/revenue" element={<RevenueAnalysis />} />
          <Route path="/analysis/expense" element={<ExpenseAnalysis />} />
          <Route path="/analysis/cash-flow" element={<CashFlowAnalysis />} />
          <Route path="/analysis/customer" element={<CustomerAnalysis />} />
          <Route path="/analysis/variance" element={<VarianceAnalysis />} />
          <Route path="/analysis/break-even" element={<BreakEvenAnalysis />} />
          <Route path="/analysis/ratio" element={<RatioAnalysis />} />
          <Route path="/analysis/trend" element={<TrendAnalysis />} />
          <Route path="/analysis/department" element={<DepartmentAnalysis />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/account" element={<Account />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/customers-vendors" element={<CustomersVendors />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/upload-center" element={<UploadCenter />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

const rootElement = document.getElementById("root");
if (rootElement && !rootElement._reactRootContainer) {
  createRoot(rootElement).render(<App />);
}
