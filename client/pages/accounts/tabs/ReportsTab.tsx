import { useState } from "react";
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
import { Download, Eye, FileText, Plus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Report {
  id: string;
  name: string;
  type: string;
  generatedDate: string;
  status: "ready" | "processing" | "scheduled";
  size: string;
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "Monthly Financial Summary - January 2024",
    type: "Financial",
    generatedDate: "2024-01-31",
    status: "ready",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Quarterly Revenue Analysis Q4 2023",
    type: "Revenue",
    generatedDate: "2024-01-15",
    status: "ready",
    size: "3.1 MB",
  },
  {
    id: "3",
    name: "Cash Flow Projection Q1 2024",
    type: "Cash Flow",
    generatedDate: "2024-01-20",
    status: "ready",
    size: "1.8 MB",
  },
  {
    id: "4",
    name: "Expense Analysis by Department",
    type: "Expense",
    generatedDate: "2024-01-25",
    status: "ready",
    size: "2.7 MB",
  },
  {
    id: "5",
    name: "Tax Summary 2023",
    type: "Tax",
    generatedDate: "2024-01-10",
    status: "ready",
    size: "4.2 MB",
  },
];

const mockReportContent = {
  title: "Monthly Financial Summary",
  sections: [
    {
      name: "Executive Summary",
      content:
        "This month showed strong financial performance with revenue exceeding projections by 12% and expenses within budget constraints.",
    },
    {
      name: "Revenue Analysis",
      content:
        "Total revenue: $185,000. Primary revenue streams: Product Sales ($120,000), Service Revenue ($45,000), Other Income ($20,000).",
    },
    {
      name: "Expense Breakdown",
      content:
        "Total expenses: $95,000. Major categories: Operations ($45,000), Staff ($30,000), Marketing ($15,000), Other ($5,000).",
    },
    {
      name: "Key Metrics",
      content:
        "Profit Margin: 48.6%. Growth Rate: 15.2%. Cash Position: Strong. Recommendations: Continue current strategy.",
    },
  ],
};

export function ReportsTab() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isViewingReport, setIsViewingReport] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDownload = (reportName: string) => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${reportName}.pdf`;
    link.click();
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Financial Reports
        </h2>
        <Button className="gap-2">
          <Plus size={16} />
          Generate New Report
        </Button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Card key={report.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex gap-3 mb-3">
              <FileText size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {report.name}
                </h3>
                <p className="text-xs text-gray-600">
                  Generated: {report.generatedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <Badge className={getStatusColor(report.status)}>
                {report.status}
              </Badge>
              <p className="text-xs text-gray-600">{report.size}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Dialog open={isViewingReport && selectedReport?.id === report.id} onOpenChange={setIsViewingReport}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => {
                      e.preventDefault();
                      setSelectedReport(report);
                      setIsViewingReport(true);
                    }}>
                      <Eye size={16} className="mr-2" />
                      View
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{selectedReport?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      <div className="flex gap-2 text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-900">
                          {selectedReport?.type}
                        </span>
                        <span className="text-gray-600 ml-4">Generated:</span>
                        <span className="font-medium text-gray-900">
                          {selectedReport?.generatedDate}
                        </span>
                      </div>

                      {mockReportContent.sections.map((section, idx) => (
                        <div key={idx}>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {section.name}
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem onClick={() => handleDownload(report.name)}>
                  <Download size={16} className="mr-2" />
                  Download
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        ))}
      </div>

      {/* Reports Summary */}
      <Card className="mt-8 p-4 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">Report Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Total Reports</p>
            <p className="text-2xl font-bold text-blue-600">{reports.length}</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Ready</p>
            <p className="text-2xl font-bold text-green-600">
              {reports.filter((r) => r.status === "ready").length}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Processing</p>
            <p className="text-2xl font-bold text-blue-600">
              {reports.filter((r) => r.status === "processing").length}
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Scheduled</p>
            <p className="text-2xl font-bold text-yellow-600">
              {reports.filter((r) => r.status === "scheduled").length}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
