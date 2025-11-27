import { Layout } from "@/components/Layout";
import { TransactionsTab } from "./accounts/tabs/TransactionsTab";

export default function Transactions() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <TransactionsTab />
      </div>
    </Layout>
  );
}
