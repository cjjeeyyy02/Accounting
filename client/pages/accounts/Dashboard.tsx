import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsTab } from "./tabs/AccountsTab";
import { ReportsTab } from "./tabs/ReportsTab";
import { AccountBalancesTab } from "./tabs/AccountBalancesTab";
import { Settings } from "lucide-react";

export default function AccountsDashboard() {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[28px] font-semibold text-gray-900">
                  Accounts Dashboard
                </h1>
                <p className="text-[14px] font-normal text-gray-600 mt-1">
                  Manage accounts, reports, transactions, and more
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start bg-transparent border-0 rounded-none flex gap-0">
                <TabsTrigger
                  value="accounts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Accounts
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Reports
                </TabsTrigger>
                <TabsTrigger
                  value="balances"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Account Balances
                </TabsTrigger>
                <TabsTrigger
                  value="transactions"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Invoices
                </TabsTrigger>
                <TabsTrigger
                  value="customers"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Customers/Vendors
                </TabsTrigger>
                <TabsTrigger
                  value="inventory"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Inventory
                </TabsTrigger>
                <TabsTrigger
                  value="budget"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Budget
                </TabsTrigger>
                <TabsTrigger
                  value="upload"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium"
                >
                  Upload Center
                </TabsTrigger>
              </TabsList>

              {/* Tab Content */}
              <div className="mt-0">
                <TabsContent value="accounts" className="mt-0">
                  <AccountsTab />
                </TabsContent>
                <TabsContent value="reports" className="mt-0">
                  <ReportsTab />
                </TabsContent>
                <TabsContent value="balances" className="mt-0">
                  <AccountBalancesTab />
                </TabsContent>
                <TabsContent value="transactions" className="mt-0">
                  <TransactionsTab />
                </TabsContent>
                <TabsContent value="invoices" className="mt-0">
                  <InvoicesTab />
                </TabsContent>
                <TabsContent value="customers" className="mt-0">
                  <CustomersVendorsTab />
                </TabsContent>
                <TabsContent value="inventory" className="mt-0">
                  <InventoryTab />
                </TabsContent>
                <TabsContent value="budget" className="mt-0">
                  <BudgetTab />
                </TabsContent>
                <TabsContent value="upload" className="mt-0">
                  <UploadCenterTab />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

      </div>
    </Layout>
  );
}
