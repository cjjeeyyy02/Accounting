import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Filter } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  account: string;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
  reference: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-20",
    description: "Client Invoice Payment #INV-001",
    category: "Income",
    account: "Business Checking",
    amount: 15000,
    type: "credit",
    status: "completed",
    reference: "REF-001",
  },
  {
    id: "2",
    date: "2024-01-19",
    description: "Employee Payroll",
    category: "Payroll",
    account: "Business Checking",
    amount: 28000,
    type: "debit",
    status: "completed",
    reference: "REF-002",
  },
  {
    id: "3",
    date: "2024-01-18",
    description: "Office Supplies Purchase",
    category: "Operating Expenses",
    account: "Business Checking",
    amount: 450,
    type: "debit",
    status: "completed",
    reference: "REF-003",
  },
  {
    id: "4",
    date: "2024-01-17",
    description: "Service Revenue",
    category: "Income",
    account: "Business Checking",
    amount: 8500,
    type: "credit",
    status: "completed",
    reference: "REF-004",
  },
  {
    id: "5",
    date: "2024-01-16",
    description: "Vendor Payment - Equipment",
    category: "Assets",
    account: "Business Checking",
    amount: 12000,
    type: "debit",
    status: "pending",
    reference: "REF-005",
  },
  {
    id: "6",
    date: "2024-01-15",
    description: "Interest Income",
    category: "Income",
    account: "Savings Account",
    amount: 250,
    type: "credit",
    status: "completed",
    reference: "REF-006",
  },
];

export function TransactionsTab() {
  const [transactions, setTransactions] = useState<Transaction[]>(
    mockTransactions
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = transactions.filter((tx) => {
    const dateOk =
      (!dateFrom || tx.date >= dateFrom) &&
      (!dateTo || tx.date <= dateTo);
    const typeOk = typeFilter === "all" || tx.type === typeFilter;
    const accountOk =
      accountFilter === "all" || tx.account === accountFilter;
    const statusOk = statusFilter === "all" || tx.status === statusFilter;

    return dateOk && typeOk && accountOk && statusOk;
  });

  const totalCredit = filteredTransactions
    .filter((tx) => tx.type === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalDebit = filteredTransactions
    .filter((tx) => tx.type === "debit")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const handleExport = () => {
    const csvContent = [
      ["Date", "Description", "Category", "Account", "Amount", "Type", "Status"],
      ...filteredTransactions.map((tx) => [
        tx.date,
        tx.description,
        tx.category,
        tx.account,
        tx.amount,
        tx.type,
        tx.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          All Transactions
        </h2>
        <Button onClick={handleExport} className="gap-2">
          <Download size={16} />
          Export to CSV
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6 bg-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <Filter size={18} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              From Date
            </label>
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              To Date
            </label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Type
            </label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Account
            </label>
            <Select value={accountFilter} onValueChange={setAccountFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="Business Checking">
                  Business Checking
                </SelectItem>
                <SelectItem value="Savings Account">
                  Savings Account
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-gray-600 text-sm mb-1">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">
            {filteredTransactions.length}
          </p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-gray-600 text-sm mb-1">Total Inflow</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalCredit.toLocaleString()}
          </p>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-gray-600 text-sm mb-1">Total Outflow</p>
          <p className="text-2xl font-bold text-red-600">
            ${totalDebit.toLocaleString()}
          </p>
        </Card>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-gray-700 font-semibold">
                Date
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Description
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Category
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Account
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">
                Amount
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Reference
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {tx.date}
                </TableCell>
                <TableCell className="text-gray-700">
                  {tx.description}
                </TableCell>
                <TableCell className="text-gray-700">{tx.category}</TableCell>
                <TableCell className="text-gray-700">{tx.account}</TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    tx.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}${tx.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(tx.status)}>
                    {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700 text-sm">
                  {tx.reference}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
