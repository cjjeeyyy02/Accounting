import { Layout } from "@/components/Layout";
import { CustomersVendorsTab } from "./accounts/tabs/CustomersVendorsTab";

export default function CustomersVendors() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <CustomersVendorsTab />
      </div>
    </Layout>
  );
}
