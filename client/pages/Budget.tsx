import { Layout } from "@/components/Layout";
import { BudgetTab } from "./accounts/tabs/BudgetTab";

export default function Budget() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <BudgetTab />
      </div>
    </Layout>
  );
}
