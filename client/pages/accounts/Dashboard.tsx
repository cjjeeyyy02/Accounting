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
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
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
              </div>
            </Tabs>
          </div>
        </div>

      </div>
    </Layout>
  );
}
