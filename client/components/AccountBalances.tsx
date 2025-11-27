import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  name: string;
  balance: string;
  type: string;
  color: string;
  change: number;
}

const accounts: Account[] = [
  {
    id: "1",
    name: "Checking",
    balance: "$245k",
    type: "+ 2.5% in month",
    color: "bg-blue-50",
    change: 2.5,
  },
  {
    id: "2",
    name: "Savings",
    balance: "$125k",
    type: "- 1.2% in month",
    color: "bg-green-50",
    change: -1.2,
  },
  {
    id: "3",
    name: "Investment",
    balance: "$90k",
    type: "+ 5.8% in month",
    color: "bg-yellow-50",
    change: 5.8,
  },
  {
    id: "4",
    name: "Crypto",
    balance: "$355k",
    type: "+ 12.3% in month",
    color: "bg-purple-50",
    change: 12.3,
  },
  {
    id: "5",
    name: "Assets",
    balance: "$520k",
    type: "+ 4.1% in month",
    color: "bg-indigo-50",
    change: 4.1,
  },
];

export function AccountBalances() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Account Balances
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className={cn(
              "p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            )}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-2 rounded-lg", account.color)}>
                <CreditCard size={20} className="text-gray-700" />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {account.name}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">
              {account.balance}
            </p>
            <p
              className={cn(
                "text-xs font-medium",
                account.change > 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {account.change > 0 ? "+" : ""}{account.change}% in month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
