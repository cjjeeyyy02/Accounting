import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Marketing", value: 35, color: "#3b82f6" },
  { name: "Operations", value: 25, color: "#10b981" },
  { name: "Development", value: 20, color: "#f59e0b" },
  { name: "Other", value: 20, color: "#8b5cf6" },
];

export function ExpenseBreakdown() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Expense Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
            formatter={(value: any) => `${value}%`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
