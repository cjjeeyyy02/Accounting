import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useForm } from "react-hook-form";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";

interface BudgetCategory {
  id: string;
  name: string;
  budgetedAmount: number;
  actualAmount: number;
  period: string;
}

const mockBudgets: BudgetCategory[] = [
  {
    id: "1",
    name: "Marketing & Advertising",
    budgetedAmount: 50000,
    actualAmount: 38500,
    period: "2024-Q1",
  },
  {
    id: "2",
    name: "Staff & Payroll",
    budgetedAmount: 150000,
    actualAmount: 155200,
    period: "2024-Q1",
  },
  {
    id: "3",
    name: "Operations & Maintenance",
    budgetedAmount: 35000,
    actualAmount: 32100,
    period: "2024-Q1",
  },
  {
    id: "4",
    name: "Technology & Infrastructure",
    budgetedAmount: 45000,
    actualAmount: 41800,
    period: "2024-Q1",
  },
  {
    id: "5",
    name: "Professional Services",
    budgetedAmount: 25000,
    actualAmount: 22500,
    period: "2024-Q1",
  },
];

export function BudgetTab() {
  const [budgets, setBudgets] = useState<BudgetCategory[]>(mockBudgets);
  const [isAddingBudget, setIsAddingBudget] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      budgetedAmount: "",
      actualAmount: "",
      period: "2024-Q1",
    },
  });

  const handleAddBudget = (data: any) => {
    const newBudget: BudgetCategory = {
      id: String(budgets.length + 1),
      name: data.name,
      budgetedAmount: parseFloat(data.budgetedAmount),
      actualAmount: parseFloat(data.actualAmount),
      period: data.period,
    };
    setBudgets([...budgets, newBudget]);
    setIsAddingBudget(false);
    form.reset();
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.budgetedAmount, 0);
  const totalActual = budgets.reduce((sum, b) => sum + b.actualAmount, 0);
  const variance = totalBudget - totalActual;

  const getVariancePercentage = (budget: number, actual: number) => {
    return ((budget - actual) / budget) * 100;
  };

  const getVarianceColor = (budget: number, actual: number) => {
    const variance = budget - actual;
    if (variance > 0) return "text-green-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Budget Planning & Tracking
        </h2>
        <Dialog open={isAddingBudget} onOpenChange={setIsAddingBudget}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Add Budget Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Budget Category</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(handleAddBudget)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Marketing, Payroll, Operations"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budgetedAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budgeted Amount</FormLabel>
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
                name="actualAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Actual Amount (Current)</FormLabel>
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
                Add Budget
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-gray-600 text-sm mb-1">Total Budget</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalBudget.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {budgets.length} categories
          </p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-gray-600 text-sm mb-1">Actual Spending</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalActual.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {((totalActual / totalBudget) * 100).toFixed(1)}% of budget
          </p>
        </Card>
        <Card
          className={`p-4 ${
            variance > 0
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <p className="text-gray-600 text-sm mb-1">Variance</p>
          <p
            className={`text-2xl font-bold ${
              variance > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${Math.abs(variance).toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            {variance > 0 ? "Under budget" : "Over budget"}
          </p>
        </Card>
      </div>

      {/* Budget Items */}
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentageUsed = (budget.actualAmount / budget.budgetedAmount) * 100;
          const variance = budget.budgetedAmount - budget.actualAmount;
          const isOverBudget = variance < 0;

          return (
            <Card key={budget.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {budget.name}
                  </h3>
                  <p className="text-xs text-gray-600">Period: {budget.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    ${budget.actualAmount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">
                    of ${budget.budgetedAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <Progress value={Math.min(percentageUsed, 100)} className="h-2 mb-3" />

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">Used:</span>
                  <span className="font-semibold text-gray-900">
                    {percentageUsed.toFixed(1)}%
                  </span>
                </div>
                <div
                  className={`flex items-center gap-1 font-semibold ${getVarianceColor(
                    budget.budgetedAmount,
                    budget.actualAmount
                  )}`}
                >
                  {isOverBudget ? (
                    <>
                      <TrendingDown size={14} />
                      <span>${Math.abs(variance).toLocaleString()} over</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp size={14} />
                      <span>${variance.toLocaleString()} under</span>
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Budget Analysis Section */}
      <Card className="mt-6 p-6 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-4">Budget Analysis</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Categories Under Budget</p>
            <div className="space-y-2">
              {budgets
                .filter(
                  (b) => b.budgetedAmount > b.actualAmount
                )
                .slice(0, 3)
                .map((b) => (
                  <div
                    key={b.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-700">{b.name}</span>
                    <span className="text-green-600 font-semibold">
                      ${(b.budgetedAmount - b.actualAmount).toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Categories Over Budget</p>
            <div className="space-y-2">
              {budgets
                .filter(
                  (b) => b.budgetedAmount < b.actualAmount
                )
                .map((b) => (
                  <div
                    key={b.id}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-gray-700">{b.name}</span>
                    <span className="text-red-600 font-semibold">
                      ${(b.actualAmount - b.budgetedAmount).toLocaleString()} over
                    </span>
                  </div>
                ))}
              {budgets.filter(
                (b) => b.budgetedAmount < b.actualAmount
              ).length === 0 && (
                <p className="text-sm text-gray-600 italic">No categories over budget</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm">
          <p className="text-blue-900">
            Overall, you are spending{" "}
            <span className="font-semibold">
              {((totalActual / totalBudget) * 100).toFixed(1)}%
            </span>{" "}
            of your total budget. {variance > 0 ? `You are $${variance.toLocaleString()} under budget.` : `You are $${Math.abs(variance).toLocaleString()} over budget.`}
          </p>
        </div>
      </Card>
    </div>
  );
}
