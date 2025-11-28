import { FileText, DollarSign, BarChart3, Eye, Download, MoreVertical } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Report {
  id: string;
  name: string;
  type: "Financial" | "Tax" | "Operational";
  period: string;
  date: string;
  status: "Ready" | "Processing" | "Failed";
}

const reports: Report[] = [
  {
    id: "1",
    name: "Profit & Loss Statement",
    type: "Financial",
    period: "Q2 2024",
    date: "Jun 25, 2024",
    status: "Ready",
  },
  {
    id: "2",
    name: "Balance Sheet",
    type: "Financial",
    period: "Jun 2024",
    date: "Jun 28, 2024",
    status: "Ready",
  },
  {
    id: "3",
    name: "Cash Flow Statement",
    type: "Financial",
    period: "Q2 2024",
    date: "Jun 25, 2024",
    status: "Ready",
  },
  {
    id: "4",
    name: "Tax Report Summary",
    type: "Tax",
    period: "2024 YTD",
    date: "Jun 28, 2024",
    status: "Ready",
  },
  {
    id: "5",
    name: "Cash Flow Statement",
    type: "Financial",
    period: "Jun 2024",
    date: "Jun 28, 2024",
    status: "Ready",
  },
  {
    id: "6",
    name: "Accounts Payable Aging",
    type: "Operational",
    period: "Jun 2024",
    date: "Jun 28, 2024",
    status: "Ready",
  },
];

const reportCategories = [
  {
    title: "Financial Reports",
    description: "Core financial statements",
    icon: DollarSign,
    count: 5,
  },
  {
    title: "Tax Reports",
    description: "Tax and compliance documents",
    icon: FileText,
    count: 8,
  },
  {
    title: "Operational Reports",
    description: "Business operations metrics",
    icon: BarChart3,
    count: 12,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready":
      return "bg-green-100 text-green-800";
    case "Processing":
      return "bg-yellow-100 text-yellow-800";
    case "Failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Financial":
      return "bg-blue-100 text-blue-800";
    case "Tax":
      return "bg-purple-100 text-purple-800";
    case "Operational":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Reports() {
  return (
    <Layout>
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 mb-1">Reports</h1>
              <p className="text-[12px] font-normal text-gray-600">Access and generate financial reports</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-xs h-8">
              + Export All
            </Button>
          </div>

          {/* Report Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {reportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="bg-white rounded-lg border border-gray-200 p-3 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs text-gray-600">{category.description}</p>
                </div>
              );
            })}
          </div>

          {/* Recent Reports Section */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-bold text-gray-900">Recent Reports</h2>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="px-2 py-1 border border-gray-300 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                />
                <Button variant="outline" className="text-xs h-8">
                  Filter
                </Button>
              </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-700">Report Name</TableHead>
                    <TableHead className="text-gray-700">Type</TableHead>
                    <TableHead className="text-gray-700">Period</TableHead>
                    <TableHead className="text-gray-700">Date</TableHead>
                    <TableHead className="text-gray-700">Status</TableHead>
                    <TableHead className="text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-gray-50">
                      <TableCell className="text-gray-900 font-medium">
                        {report.name}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getTypeColor(report.type)}`}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{report.period}</TableCell>
                      <TableCell className="text-gray-700">{report.date}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(report.status)}`}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                            <Eye size={18} className="text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Download">
                            <Download size={18} className="text-gray-600" />
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreVertical size={18} className="text-gray-600" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Custom Report Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Need a Custom Report?
            </h3>
            <p className="text-gray-600 mb-4">
              Generate a custom financial report tailored to your specific needs.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Generate Custom Report
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
