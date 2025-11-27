import { Layout } from "@/components/Layout";
import { InventoryTab } from "./accounts/tabs/InventoryTab";

export default function Inventory() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <InventoryTab />
      </div>
    </Layout>
  );
}
