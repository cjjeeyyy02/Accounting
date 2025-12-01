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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { Edit2, Eye, Plus, Trash2, Mail, Phone, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface ContactEntity {
  id: string;
  name: string;
  type: "customer" | "vendor";
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  status: "active" | "inactive";
  totalTransactions: number;
  totalAmount: number;
}

const mockContacts: ContactEntity[] = [
  {
    id: "1",
    name: "Acme Corporation",
    type: "customer",
    email: "contact@acme.com",
    phone: "+1-555-0101",
    address: "123 Business Ave",
    city: "New York",
    country: "USA",
    status: "active",
    totalTransactions: 45,
    totalAmount: 125000,
  },
  {
    id: "2",
    name: "Tech Solutions Inc",
    type: "customer",
    email: "sales@techsol.com",
    phone: "+1-555-0102",
    address: "456 Innovation Blvd",
    city: "San Francisco",
    country: "USA",
    status: "active",
    totalTransactions: 32,
    totalAmount: 98500,
  },
  {
    id: "3",
    name: "Global Supplies Ltd",
    type: "vendor",
    email: "vendor@globalsup.com",
    phone: "+44-201-5555",
    address: "789 Supply Street",
    city: "London",
    country: "UK",
    status: "active",
    totalTransactions: 56,
    totalAmount: 145000,
  },
  {
    id: "4",
    name: "Future Ventures",
    type: "customer",
    email: "hello@futurev.com",
    phone: "+1-555-0103",
    address: "321 Growth Lane",
    city: "Austin",
    country: "USA",
    status: "active",
    totalTransactions: 18,
    totalAmount: 45200,
  },
  {
    id: "5",
    name: "International Trade Co",
    type: "vendor",
    email: "trade@intltrade.com",
    phone: "+86-10-5555",
    address: "654 Commerce Way",
    city: "Shanghai",
    country: "China",
    status: "inactive",
    totalTransactions: 12,
    totalAmount: 32000,
  },
];

export function CustomersVendorsTab() {
  const [contacts, setContacts] = useState<ContactEntity[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<ContactEntity | null>(
    null
  );
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isViewingContact, setIsViewingContact] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<ContactEntity | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      type: "customer",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      status: "active",
    },
  });

  const handleAddContact = (data: any) => {
    if (isEditing && selectedContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.id === selectedContact.id
          ? {
              ...contact,
              name: data.name,
              type: data.type,
              email: data.email,
              phone: data.phone,
              address: data.address,
              city: data.city,
              country: data.country,
              status: data.status,
            }
          : contact
      );
      setContacts(updatedContacts);
      setIsEditing(false);
      setIsAddingContact(false);
      setSelectedContact(null);
      form.reset();
    } else {
      const newContact: ContactEntity = {
        id: String(contacts.length + 1),
        name: data.name,
        type: data.type,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
        status: data.status,
        totalTransactions: 0,
        totalAmount: 0,
      };
      setContacts([...contacts, newContact]);
      setIsAddingContact(false);
      form.reset();
    }
  };

  const handleOpenEdit = (contact: ContactEntity) => {
    setSelectedContact(contact);
    setIsEditing(true);
    setIsAddingContact(true);
    form.reset({
      name: contact.name,
      type: contact.type,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      city: contact.city,
      country: contact.country,
      status: contact.status,
    });
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
    setContactToDelete(null);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      handleDeleteContact(contactToDelete.id);
    }
  };

  const filteredContacts =
    typeFilter === "all"
      ? contacts
      : contacts.filter((c) => c.type === typeFilter);

  const getTypeColor = (type: string) => {
    return type === "customer"
      ? "bg-blue-100 text-blue-800"
      : "bg-purple-100 text-purple-800";
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Customers & Vendors
        </h2>
        <Dialog open={isAddingContact} onOpenChange={(open) => {
          setIsAddingContact(open);
          if (!open) {
            setIsEditing(false);
            setSelectedContact(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Contact" : "Add New Contact"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddContact)}
                className="space-y-4"
              >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company or person name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1-555-0000" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
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
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {isEditing ? "Update Contact" : "Add Contact"}
              </Button>
            </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2">
        <Button
          variant={typeFilter === "all" ? "default" : "outline"}
          onClick={() => setTypeFilter("all")}
          className="text-sm"
        >
          All ({contacts.length})
        </Button>
        <Button
          variant={typeFilter === "customer" ? "default" : "outline"}
          onClick={() => setTypeFilter("customer")}
          className="text-sm"
        >
          Customers ({contacts.filter((c) => c.type === "customer").length})
        </Button>
        <Button
          variant={typeFilter === "vendor" ? "default" : "outline"}
          onClick={() => setTypeFilter("vendor")}
          className="text-sm"
        >
          Vendors ({contacts.filter((c) => c.type === "vendor").length})
        </Button>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto border rounded-lg mb-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-gray-700 font-semibold">
                Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Type
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Contact
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Location
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Transactions
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {contact.name}
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(contact.type)}>
                    {contact.type === "customer" ? "Customer" : "Vendor"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail size={14} className="text-gray-600" />
                      <span>{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone size={14} className="text-gray-600" />
                      <span>{contact.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-700">
                  {contact.city}, {contact.country}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(contact.status)}>
                    {contact.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-700">
                  <div className="text-sm">
                    <p className="font-semibold">
                      {contact.totalTransactions}
                    </p>
                    <p className="text-gray-600">
                      ${(contact.totalAmount / 1000).toFixed(0)}k
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog open={isViewingContact && selectedContact?.id === contact.id} onOpenChange={setIsViewingContact}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedContact?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Card className="p-4 bg-gray-50">
                            <h3 className="font-semibold mb-3 text-gray-900">
                              Contact Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 mb-1">Type</p>
                                <Badge
                                  className={getTypeColor(
                                    selectedContact?.type || ""
                                  )}
                                >
                                  {selectedContact?.type === "customer"
                                    ? "Customer"
                                    : "Vendor"}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Status</p>
                                <Badge
                                  className={getStatusColor(
                                    selectedContact?.status || ""
                                  )}
                                >
                                  {selectedContact?.status}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Email</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedContact?.email}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Phone</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedContact?.phone}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-600 mb-1">Address</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedContact?.address}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-gray-600 mb-1">
                                  Location
                                </p>
                                <p className="font-semibold text-gray-900">
                                  {selectedContact?.city},
                                  {selectedContact?.country}
                                </p>
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4 bg-gray-50">
                            <h3 className="font-semibold mb-3 text-gray-900">
                              Transaction Summary
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 mb-1">Total</p>
                                <p className="text-xl font-bold text-gray-900">
                                  {selectedContact?.totalTransactions}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">
                                  Total Amount
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  $
                                  {selectedContact?.totalAmount.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </Card>

                          <div className="flex gap-2">
                            <Button variant="outline" className="flex-1">
                              View Transactions
                            </Button>
                            <Button className="flex-1">Send Invoice</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(contact)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Dialog open={contactToDelete?.id === contact.id} onOpenChange={(open) => {
                      if (!open) setContactToDelete(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setContactToDelete(contact)}
                        >
                          <Trash2 size={16} className="text-red-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Contact</DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-gray-600">
                          Are you sure you want to delete <strong>{contactToDelete?.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                          <Button
                            variant="outline"
                            onClick={() => setContactToDelete(null)}
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
