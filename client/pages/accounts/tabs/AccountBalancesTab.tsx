import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowDownRight, ArrowUpRight, Eye, TrendingUp, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface AccountBalance {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  percentage: number;
  trend: "up" | "down";
  trendValue: number;
  lastUpdated: string;
}

const mockAccountBalances: AccountBalance[] = [
  {
    id: "1",
    name: "Business Checking",
    type: "Checking",
    balance: 85000,
    currency: "USD",
    percentage: 35,
    trend: "up",
    trendValue: 5.2,
    lastUpdated: "Today",
  },
  {
    id: "2",
    name: "Savings Account",
    type: "Savings",
    balance: 125000,
    currency: "USD",
    percentage: 52,
    trend: "up",
    trendValue: 2.1,
    lastUpdated: "Today",
  },
  {
    id: "3",
    name: "Operating Reserve",
    type: "Money Market",
    balance: 35000,
    currency: "USD",
    percentage: 13,
    trend: "down",
    trendValue: -1.3,
    lastUpdated: "Today",
  },
];

const mockTransactions = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Client Invoice Payment",
    amount: 8000,
    type: "credit",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Payroll Distribution",
    amount: 25000,
    type: "debit",
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "Service Income",
    amount: 12000,
    type: "credit",
  },
  {
    id: "4",
    date: "2024-01-12",
    description: "Vendor Payment",
    amount: 3500,
    type: "debit",
  },
];

export function AccountBalancesTab() {
  const [selectedAccount, setSelectedAccount] = useState<AccountBalance | null>(
    null
  );
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  const totalBalance = mockAccountBalances.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Account Balances Summary
        </h2>
        <p className="text-sm text-gray-600">
          View all your accounts and their current balances
        </p>
      </div>

      {/* Total Balance Card */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-1">Total Balance</p>
            <h3 className="text-4xl font-bold text-gray-900">
              ${totalBalance.toLocaleString()}
            </h3>
            <p className="text-xs text-gray-600 mt-2">As of today</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <ArrowUpRight size={18} />
              <span>+2.4%</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">vs last month</p>
          </div>
        </div>
      </Card>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {mockAccountBalances.map((account) => (
          <Card
            key={account.id}
            className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              setSelectedAccount(account);
              setIsViewingDetails(true);
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {account.name}
                </h3>
                <p className="text-xs text-gray-600">{account.type}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Dialog open={isViewingDetails && selectedAccount?.id === account.id} onOpenChange={setIsViewingDetails}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => {
                        e.preventDefault();
                        setSelectedAccount(account);
                        setIsViewingDetails(true);
                      }}>
                        <Eye size={16} className="mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{selectedAccount?.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Account Details */}
                    <Card className="p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Account Type</p>
                          <p className="font-semibold text-gray-900">
                            {selectedAccount?.type}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Currency</p>
                          <p className="font-semibold text-gray-900">
                            {selectedAccount?.currency}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-600 mb-1">Current Balance</p>
                          <p className="text-2xl font-bold text-gray-900">
                            ${selectedAccount?.balance.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Performance */}
                    <Card className="p-4 bg-gray-50">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Performance
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Monthly Growth
                          </span>
                          <div
                            className={`flex items-center gap-1 font-semibold ${
                              selectedAccount?.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {selectedAccount?.trend === "up" ? (
                              <ArrowUpRight size={16} />
                            ) : (
                              <ArrowDownRight size={16} />
                            )}
                            <span>
                              {selectedAccount?.trendValue}%
                            </span>
                          </div>
                        </div>
                        <Progress
                          value={
                            selectedAccount?.trend === "up"
                              ? (selectedAccount?.trendValue || 0) * 10
                              : Math.abs((selectedAccount?.trendValue || 0)) * 10
                          }
                          className="h-2"
                        />
                      </div>
                    </Card>

                    {/* Recent Transactions */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        Recent Transactions
                      </h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {mockTransactions.map((tx) => (
                          <div
                            key={tx.id}
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                          >
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {tx.description}
                              </p>
                              <p className="text-xs text-gray-600">
                                {tx.date}
                              </p>
                            </div>
                            <p
                              className={`font-semibold text-sm ${
                                tx.type === "credit"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {tx.type === "credit" ? "+" : "-"}$
                              {tx.amount.toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Transfer Funds
                      </Button>
                      <Button className="flex-1">Edit Account</Button>
                    </div>
                  </div>
                </DialogContent>
                  </Dialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Balance */}
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <p className="text-2xl font-bold text-gray-900">
                  ${(account.balance / 1000).toFixed(0)}k
                </p>
                <div
                  className={`flex items-center gap-0.5 text-xs font-semibold ${
                    account.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {account.trend === "up" ? (
                    <ArrowUpRight size={12} />
                  ) : (
                    <ArrowDownRight size={12} />
                  )}
                  <span>{Math.abs(account.trendValue)}%</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">
                {account.percentage}% of total
              </p>
            </div>

            {/* Progress Bar */}
            <Progress value={account.percentage} className="h-2 mb-3" />

            {/* Last Updated */}
            <p className="text-xs text-gray-500">{account.lastUpdated}</p>
          </Card>
        ))}
      </div>

      {/* Balance Distribution */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Balance Distribution</h3>
        <div className="space-y-3">
          {mockAccountBalances.map((account) => (
            <div key={account.id}>
              <div className="flex items-center justify-between mb-1 text-sm">
                <span className="font-medium text-gray-900">{account.name}</span>
                <span className="text-gray-600">
                  {account.percentage}% (${account.balance.toLocaleString()})
                </span>
              </div>
              <Progress value={account.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
