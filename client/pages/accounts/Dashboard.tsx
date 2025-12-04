import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsTab } from "./tabs/AccountsTab";
import { ReportsTab } from "./tabs/ReportsTab";
import { AccountBalancesTab } from "./tabs/AccountBalancesTab";

export default function AccountsDashboard() {
  const [activeTab, setActiveTab] = useState("accounts");

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen w-full">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 w-full">
          <div className="px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bank Accounts
            </h1>
            <p className="text-gray-600">
              Manage your bank accounts and financial records
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white w-full px-6 lg:px-8 py-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="rounded-none bg-transparent p-0 h-auto border-b border-gray-200 justify-start gap-0">
              <TabsTrigger
                value="accounts"
                className="rounded-none bg-transparent px-4 py-4 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                Bank Accounts
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="rounded-none bg-transparent px-4 py-4 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="balances"
                className="rounded-none bg-transparent px-4 py-4 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-blue-600"
              >
                Account Balances
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <TabsContent value="accounts" className="mt-0">
              <AccountsTab />
            </TabsContent>
            <TabsContent value="reports" className="mt-0">
              <ReportsTab />
            </TabsContent>
            <TabsContent value="balances" className="mt-0">
              <AccountBalancesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
