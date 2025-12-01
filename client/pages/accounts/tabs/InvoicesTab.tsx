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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Eye,
  Plus,
  Trash2,
  Download,
  CheckCircle2,
  Edit2,
} from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue" | "draft";
  createdDate: string;
  description: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    client: "Acme Corporation",
    amount: 5000,
    dueDate: "2024-02-15",
    status: "paid",
    createdDate: "2024-01-15",
    description: "Web Development Services",
  },
  {
    id: "2",
    number: "INV-2024-002",
    client: "Tech Solutions Inc",
    amount: 8500,
    dueDate: "2024-02-10",
    status: "pending",
    createdDate: "2024-01-10",
    description: "Consulting & Strategy",
  },
  {
    id: "3",
    number: "INV-2024-003",
    client: "Global Enterprises",
    amount: 12000,
    dueDate: "2024-01-25",
    status: "overdue",
    createdDate: "2023-12-25",
    description: "Software License & Support",
  },
  {
    id: "4",
    number: "INV-2024-004",
    client: "Future Ventures",
    amount: 3500,
    dueDate: "2024-02-20",
    status: "draft",
    createdDate: "2024-01-19",
    description: "Design Services",
  },
  {
    id: "5",
    number: "INV-2024-005",
    client: "Innovation Lab",
    amount: 6200,
    dueDate: "2024-02-05",
    status: "pending",
    createdDate: "2024-01-12",
    description: "Training & Development",
  },
];

export function InvoicesTab() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isAddingInvoice, setIsAddingInvoice] = useState(false);
  const [isViewingInvoice, setIsViewingInvoice] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);

  const form = useForm({
    defaultValues: {
      number: "",
      client: "",
      amount: "",
      dueDate: "",
      status: "draft",
      description: "",
    },
  });

  const handleCreateInvoice = (data: any) => {
    if (isEditing && selectedInvoice) {
      const updatedInvoices = invoices.map((inv) =>
        inv.id === selectedInvoice.id
          ? {
              ...inv,
              number: data.number,
              client: data.client,
              amount: parseFloat(data.amount),
              dueDate: data.dueDate,
              status: data.status,
              description: data.description,
            }
          : inv
      );
      setInvoices(updatedInvoices);
      setIsEditing(false);
      setIsAddingInvoice(false);
      setSelectedInvoice(null);
      form.reset();
    } else {
      const newInvoice: Invoice = {
        id: String(invoices.length + 1),
        number: data.number,
        client: data.client,
        amount: parseFloat(data.amount),
        dueDate: data.dueDate,
        status: data.status,
        createdDate: new Date().toISOString().split("T")[0],
        description: data.description,
      };
      setInvoices([...invoices, newInvoice]);
      setIsAddingInvoice(false);
      form.reset();
    }
  };

  const handleOpenEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsEditing(true);
    setIsAddingInvoice(true);
    form.reset({
      number: invoice.number,
      client: invoice.client,
      amount: String(invoice.amount),
      dueDate: invoice.dueDate,
      status: invoice.status,
      description: invoice.description,
    });
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
    setInvoiceToDelete(null);
  };

  const confirmDelete = () => {
    if (invoiceToDelete) {
      handleDeleteInvoice(invoiceToDelete.id);
    }
  };

  const handleMarkAsPaid = (id: string) => {
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, status: "paid" as const } : inv
      )
    );
  };

  const handleDownloadInvoice = (invoiceNumber: string) => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${invoiceNumber}.pdf`;
    link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Invoice Management
        </h2>
        <Dialog open={isAddingInvoice} onOpenChange={(open) => {
          setIsAddingInvoice(open);
          if (!open) {
            setIsEditing(false);
            setSelectedInvoice(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(handleCreateInvoice)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., INV-2024-001" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client/Customer</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description/Details</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What services were provided?"
                        {...field}
                      />
                    </FormControl>
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
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isEditing ? "Update Invoice" : "Create Invoice"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-gray-600 text-sm mb-1">Total Invoiced</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalAmount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {invoices.length} invoices
          </p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-gray-600 text-sm mb-1">Paid</p>
          <p className="text-2xl font-bold text-green-600">
            ${paidAmount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {invoices.filter((i) => i.status === "paid").length} paid
          </p>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-gray-600 text-sm mb-1">Outstanding</p>
          <p className="text-2xl font-bold text-red-600">
            ${pendingAmount.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {invoices.filter((i) => i.status !== "paid").length} pending
          </p>
        </Card>
      </div>

      {/* Invoices Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-gray-700 font-semibold">
                Invoice #
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Client
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Due Date
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">
                Amount
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
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {invoice.number}
                </TableCell>
                <TableCell className="text-gray-700">{invoice.client}</TableCell>
                <TableCell className="text-gray-700">
                  {invoice.dueDate}
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  ${invoice.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog open={isViewingInvoice && selectedInvoice?.id === invoice.id} onOpenChange={setIsViewingInvoice}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoice(invoice)}
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>
                            Invoice {selectedInvoice?.number}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Card className="p-4 bg-gray-50">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 mb-1">Client</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedInvoice?.client}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">
                                  Created Date
                                </p>
                                <p className="font-semibold text-gray-900">
                                  {selectedInvoice?.createdDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Due Date</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedInvoice?.dueDate}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Status</p>
                                <Badge
                                  className={getStatusColor(
                                    selectedInvoice?.status || ""
                                  )}
                                >
                                  {selectedInvoice?.status}
                                </Badge>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-600 mb-1">Amount</p>
                                <p className="text-2xl font-bold text-gray-900">
                                  ${selectedInvoice?.amount.toLocaleString()}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-600 mb-1">
                                  Description
                                </p>
                                <p className="text-gray-900">
                                  {selectedInvoice?.description}
                                </p>
                              </div>
                            </div>
                          </Card>
                          <div className="flex gap-2">
                            {selectedInvoice?.status !== "paid" && (
                              <Button
                                className="flex-1 gap-2"
                                onClick={() =>
                                  handleMarkAsPaid(selectedInvoice.id)
                                }
                              >
                                <CheckCircle2 size={16} />
                                Mark as Paid
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              className="flex-1 gap-2"
                              onClick={() =>
                                handleDownloadInvoice(
                                  selectedInvoice?.number || ""
                                )
                              }
                            >
                              <Download size={16} />
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteInvoice(invoice.id)}
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
