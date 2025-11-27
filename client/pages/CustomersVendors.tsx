import { Layout } from "@/components/Layout";
import { CustomersVendorsTab } from "./accounts/tabs/CustomersVendorsTab";
import { Settings } from "lucide-react";

export default function CustomersVendors() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[28px] font-semibold text-gray-900">
                  Customers & Vendors
                </h1>
                <p className="text-[14px] font-normal text-gray-600 mt-1">
                  Manage your customers and vendor contacts
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={24} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <CustomersVendorsTab />
      </div>
    </Layout>
  );
}
