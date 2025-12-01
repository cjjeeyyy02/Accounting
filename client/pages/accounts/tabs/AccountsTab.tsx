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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Edit2, Eye, Plus, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  status: "active" | "inactive" | "suspended";
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
}

const mockAccounts: Account[] = [
  {
    id: "1",
    name: "Business Checking",
    type: "Checking",
    balance: 45000,
    status: "active",
  },
  {
    id: "2",
    name: "Savings Account",
    type: "Savings",
    balance: 125000,
    status: "active",
  },
  {
    id: "3",
    name: "Operating Expense",
    type: "Expense",
    balance: 8500,
    status: "active",
  },
  {
    id: "4",
    name: "Legacy Account",
    type: "Checking",
    balance: 5200,
    status: "inactive",
  },
];

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Client Payment",
    amount: 5000,
    type: "credit",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Vendor Payment",
    amount: 2000,
    type: "debit",
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "Invoice #2401",
    amount: 3500,
    type: "credit",
  },
];

export function AccountsTab() {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [viewingDetails, setViewingDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  const form = useForm({
    defaultValues: {
      name: selectedAccount?.name || "",
      type: selectedAccount?.type || "Checking",
      status: selectedAccount?.status || "active",
    },
  });

  const handleAddAccount = (data: any) => {
    if (isEditing && selectedAccount) {
      const updatedAccounts = accounts.map((acc) =>
        acc.id === selectedAccount.id
          ? {
              ...acc,
              name: data.name,
              type: data.type,
              status: data.status as "active" | "inactive" | "suspended",
            }
          : acc
      );
      setAccounts(updatedAccounts);
      setIsEditing(false);
      setIsAddingAccount(false);
      setSelectedAccount(null);
      form.reset();
    } else {
      const newAccount: Account = {
        id: String(accounts.length + 1),
        name: data.name,
        type: data.type,
        balance: 0,
        status: data.status as "active" | "inactive" | "suspended",
      };
      setAccounts([...accounts, newAccount]);
      setIsAddingAccount(false);
      form.reset();
    }
  };

  const handleOpenEdit = (account: Account) => {
    setSelectedAccount(account);
    setIsEditing(true);
    setIsAddingAccount(true);
    form.reset({
      name: account.name,
      type: account.type,
      status: account.status,
    });
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
    setAccountToDelete(null);
    setSelectedAccount(null);
  };

  const confirmDelete = () => {
    if (accountToDelete) {
      handleDeleteAccount(accountToDelete.id);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Accounts Management
        </h2>
        <Dialog open={isAddingAccount} onOpenChange={(open) => {
          setIsAddingAccount(open);
          if (!open) {
            setIsEditing(false);
            setSelectedAccount(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              onClick={() => {
                setSelectedAccount(null);
                setIsEditing(false);
                form.reset();
              }}
            >
              <Plus size={16} />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Edit Account" : "Add New Account"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddAccount)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Checking">Checking</SelectItem>
                          <SelectItem value="Savings">Savings</SelectItem>
                          <SelectItem value="Expense">Expense</SelectItem>
                          <SelectItem value="Revenue">Revenue</SelectItem>
                          <SelectItem value="Asset">Asset</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {isEditing ? "Update Account" : "Create Account"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Accounts Table */}
      <div className="overflow-x-auto border rounded-lg mb-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-gray-700 font-semibold">
                Account Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Type
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">
                Balance
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {account.name}
                </TableCell>
                <TableCell className="text-gray-700">{account.type}</TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  ${account.balance.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(account.status)}>
                    {account.status.charAt(0).toUpperCase() +
                      account.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog open={viewingDetails && selectedAccount?.id === account.id} onOpenChange={setViewingDetails}>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => {
                            e.preventDefault();
                            setSelectedAccount(account);
                            setViewingDetails(true);
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
                            <Card className="p-4 bg-gray-50">
                              <h3 className="font-semibold mb-3 text-gray-900">
                                Account Details
                              </h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600 mb-1">
                                    Account Type
                                  </p>
                                  <p className="font-semibold text-gray-900">
                                    {selectedAccount?.type}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600 mb-1">Status</p>
                                  <Badge
                                    className={getStatusColor(
                                      selectedAccount?.status || ""
                                    )}
                                  >
                                    {selectedAccount?.status}
                                  </Badge>
                                </div>
                                <div>
                                  <p className="text-gray-600 mb-1">Balance</p>
                                  <p className="font-semibold text-gray-900">
                                    $
                                    {selectedAccount?.balance.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </Card>

                            <div>
                              <h3 className="font-semibold mb-3 text-gray-900">
                                Recent Transactions
                              </h3>
                              <div className="space-y-2">
                                {mockTransactions.map((tx) => (
                                  <div
                                    key={tx.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                  >
                                    <div>
                                      <p className="font-medium text-gray-900">
                                        {tx.description}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        {tx.date}
                                      </p>
                                    </div>
                                    <p
                                      className={`font-semibold ${
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
                          </div>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem onClick={() => handleOpenEdit(account)}>
                        <Edit2 size={16} className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <Dialog open={accountToDelete?.id === account.id} onOpenChange={(open) => {
                        if (!open) setAccountToDelete(null);
                      }}>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => {
                            e.preventDefault();
                            setAccountToDelete(account);
                          }}>
                            <Trash2 size={16} className="mr-2 text-red-600" />
                            Delete
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Account</DialogTitle>
                          </DialogHeader>
                          <p className="text-sm text-gray-600">
                            Are you sure you want to delete <strong>{accountToDelete?.name}</strong>? This action cannot be undone.
                          </p>
                          <div className="flex gap-3 justify-end">
                            <Button
                              variant="outline"
                              onClick={() => setAccountToDelete(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={confirmDelete}
                            >
                              Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
