import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
  icon?: React.ReactNode;
  accentColor?: "green" | "red" | "blue" | "purple";
}

const colorMap = {
  green: "bg-green-50 text-green-600",
  red: "bg-red-50 text-red-600",
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
};

const accentColorMap = {
  green: "text-green-600",
  red: "text-red-600",
  blue: "text-blue-600",
  purple: "text-purple-600",
};

export function StatCard({
  label,
  value,
  change,
  isPositive,
  icon,
  accentColor = "blue",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mb-4">{value}</p>
          <div className="flex items-center gap-1">
            <span
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {isPositive ? "+" : ""}{change.toFixed(2)}%
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={cn("p-3 rounded-lg", colorMap[accentColor])}>
          {isPositive ? (
            <TrendingUp
              size={24}
              className={cn("text-current", accentColorMap[accentColor])}
            />
          ) : (
            <TrendingDown
              size={24}
              className={cn("text-current", accentColorMap[accentColor])}
            />
          )}
        </div>
      </div>
    </div>
  );
}
