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
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { Edit2, Eye, Plus, Trash2, AlertTriangle } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  quantity: number;
  minQuantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Premium Software License",
    category: "Software",
    sku: "PSL-001",
    quantity: 150,
    minQuantity: 50,
    unit: "license",
    unitPrice: 299,
    totalValue: 44850,
    status: "in-stock",
  },
  {
    id: "2",
    name: "Consulting Hours",
    category: "Services",
    sku: "CONS-001",
    quantity: 200,
    minQuantity: 100,
    unit: "hours",
    unitPrice: 150,
    totalValue: 30000,
    status: "in-stock",
  },
  {
    id: "3",
    name: "Hardware Equipment A",
    category: "Equipment",
    sku: "HW-A-001",
    quantity: 12,
    minQuantity: 20,
    unit: "unit",
    unitPrice: 2500,
    totalValue: 30000,
    status: "low-stock",
  },
  {
    id: "4",
    name: "Maintenance Service Package",
    category: "Services",
    sku: "MAIN-001",
    quantity: 85,
    minQuantity: 30,
    unit: "package",
    unitPrice: 500,
    totalValue: 42500,
    status: "in-stock",
  },
  {
    id: "5",
    name: "Development Tools",
    category: "Software",
    sku: "DEV-001",
    quantity: 0,
    minQuantity: 25,
    unit: "license",
    unitPrice: 199,
    totalValue: 0,
    status: "out-of-stock",
  },
];

export function InventoryTab() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isViewingItem, setIsViewingItem] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const form = useForm({
    defaultValues: {
      name: "",
      category: "Software",
      sku: "",
      quantity: "",
      minQuantity: "",
      unit: "",
      unitPrice: "",
    },
  });

  const handleAddItem = (data: any) => {
    const newItem: InventoryItem = {
      id: String(inventory.length + 1),
      name: data.name,
      category: data.category,
      sku: data.sku,
      quantity: parseInt(data.quantity),
      minQuantity: parseInt(data.minQuantity),
      unit: data.unit,
      unitPrice: parseFloat(data.unitPrice),
      totalValue:
        parseInt(data.quantity) * parseFloat(data.unitPrice),
      status:
        parseInt(data.quantity) === 0
          ? "out-of-stock"
          : parseInt(data.quantity) <= parseInt(data.minQuantity)
            ? "low-stock"
            : "in-stock",
    };
    setInventory([...inventory, newItem]);
    setIsAddingItem(false);
    form.reset();
  };

  const handleDeleteItem = (id: string) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const filteredInventory =
    categoryFilter === "all"
      ? inventory
      : inventory.filter((i) => i.category === categoryFilter);

  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockCount = inventory.filter((i) => i.status === "low-stock").length;
  const outOfStockCount = inventory.filter((i) => i.status === "out-of-stock").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stockPercentage = (item: InventoryItem) => {
    if (item.minQuantity === 0) return 100;
    return Math.min(100, (item.quantity / (item.minQuantity * 2)) * 100);
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Inventory Management
        </h2>
        <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Inventory Item</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(handleAddItem)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Product or service name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Services">Services</SelectItem>
                        <SelectItem value="Equipment">Equipment</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Stock keeping unit" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Reorder point"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., pcs, hours, packages" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price</FormLabel>
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
              <Button type="submit" className="w-full">
                Add Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-gray-600 text-sm mb-1">Total Items</p>
          <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
          <p className="text-xs text-gray-600 mt-2">units in stock</p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-gray-600 text-sm mb-1">Inventory Value</p>
          <p className="text-2xl font-bold text-green-600">
            ${(totalInventoryValue / 1000).toFixed(1)}k
          </p>
        </Card>
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <p className="text-gray-600 text-sm mb-1">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
          <p className="text-xs text-gray-600 mt-2">items below minimum</p>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-gray-600 text-sm mb-1">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
          <p className="text-xs text-gray-600 mt-2">items to reorder</p>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="mb-6 flex gap-2">
        <Button
          variant={categoryFilter === "all" ? "default" : "outline"}
          onClick={() => setCategoryFilter("all")}
          className="text-sm"
        >
          All
        </Button>
        <Button
          variant={categoryFilter === "Software" ? "default" : "outline"}
          onClick={() => setCategoryFilter("Software")}
          className="text-sm"
        >
          Software
        </Button>
        <Button
          variant={categoryFilter === "Services" ? "default" : "outline"}
          onClick={() => setCategoryFilter("Services")}
          className="text-sm"
        >
          Services
        </Button>
        <Button
          variant={categoryFilter === "Equipment" ? "default" : "outline"}
          onClick={() => setCategoryFilter("Equipment")}
          className="text-sm"
        >
          Equipment
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-gray-700 font-semibold">
                Item Name
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Category
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">SKU</TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">
                Quantity
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">
                Unit Price
              </TableHead>
              <TableHead className="text-gray-700 font-semibold text-right">
                Total Value
              </TableHead>
              <TableHead className="text-gray-700 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-gray-900">
                  {item.name}
                </TableCell>
                <TableCell className="text-gray-700">{item.category}</TableCell>
                <TableCell className="text-gray-700 font-mono text-sm">
                  {item.sku}
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  {item.quantity} {item.unit}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status === "in-stock"
                      ? "In Stock"
                      : item.status === "low-stock"
                        ? "Low Stock"
                        : "Out of Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-gray-700">
                  ${item.unitPrice.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-semibold text-gray-900">
                  ${item.totalValue.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog open={isViewingItem && selectedItem?.id === item.id} onOpenChange={setIsViewingItem}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedItem(item)}
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedItem?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Card className="p-4 bg-gray-50">
                            <h3 className="font-semibold mb-3 text-gray-900">
                              Item Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 mb-1">SKU</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedItem?.sku}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Category</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedItem?.category}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Unit</p>
                                <p className="font-semibold text-gray-900">
                                  {selectedItem?.unit}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600 mb-1">Unit Price</p>
                                <p className="font-semibold text-gray-900">
                                  ${selectedItem?.unitPrice.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </Card>

                          <Card className="p-4 bg-gray-50">
                            <h3 className="font-semibold mb-3 text-gray-900">
                              Stock Status
                            </h3>
                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm text-gray-600">
                                    Current Quantity
                                  </span>
                                  <span className="font-semibold text-gray-900">
                                    {selectedItem?.quantity}{" "}
                                    {selectedItem?.unit}
                                  </span>
                                </div>
                                <Progress
                                  value={stockPercentage(
                                    selectedItem ||
                                      ({} as InventoryItem)
                                  )}
                                  className="h-2"
                                />
                              </div>
                              <div className="flex justify-between text-xs text-gray-600">
                                <span>
                                  Min: {selectedItem?.minQuantity}{" "}
                                  {selectedItem?.unit}
                                </span>
                                <span>
                                  Total Value: $
                                  {selectedItem?.totalValue.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </Card>

                          {selectedItem?.status !== "in-stock" && (
                            <Card className="p-4 bg-yellow-50 border-yellow-200">
                              <div className="flex gap-2 items-start">
                                <AlertTriangle
                                  size={20}
                                  className="text-yellow-600 flex-shrink-0 mt-0.5"
                                />
                                <div>
                                  <p className="font-semibold text-yellow-900">
                                    {selectedItem?.status === "low-stock"
                                      ? "Low Stock Alert"
                                      : "Out of Stock"}
                                  </p>
                                  <p className="text-sm text-yellow-800 mt-1">
                                    {selectedItem?.status === "low-stock"
                                      ? "Consider reordering this item to maintain optimal stock levels."
                                      : "This item is out of stock. Please reorder immediately."}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          )}

                          <Button className="w-full">Reorder Item</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
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
