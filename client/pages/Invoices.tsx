import { Layout } from "@/components/Layout";
import { InvoicesTab } from "./accounts/tabs/InvoicesTab";

export default function Invoices() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <InvoicesTab />
      </div>
    </Layout>
  );
}
