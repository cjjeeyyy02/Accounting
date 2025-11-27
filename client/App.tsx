import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Charts from "./pages/Charts";
import Trends from "./pages/Trends";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import AnalyticsOverview from "./pages/analytics/Overview";
import FinancialAnalysis from "./pages/analytics/Financial";
import RevenueAnalysis from "./pages/analytics/Revenue";
import ExpenseAnalysis from "./pages/analytics/Expense";
import CashFlowAnalysis from "./pages/analytics/CashFlow";
import CustomerAnalysis from "./pages/analytics/Customer";
import VarianceAnalysis from "./pages/analytics/Variance";
import BreakEvenAnalysis from "./pages/analytics/BreakEven";
import RatioAnalysis from "./pages/analytics/Ratio";
import TrendAnalysis from "./pages/analytics/Trend";
import DepartmentAnalysis from "./pages/analytics/Department";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
