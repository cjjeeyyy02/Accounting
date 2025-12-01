import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Cloud,
  Download,
  FileText,
  Plus,
  Trash2,
  Upload,
  X,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  category: string;
  size: string;
  uploadDate: string;
  status: "processed" | "processing" | "failed";
}

const mockUploadedFiles: UploadedFile[] = [
  {
    id: "1",
    name: "January_Expense_Report_2024.pdf",
    type: "PDF",
    category: "Expense Reports",
    size: "2.4 MB",
    uploadDate: "2024-02-01",
    status: "processed",
  },
  {
    id: "2",
    name: "Q4_Sales_Summary.xlsx",
    type: "Excel",
    category: "Sales Reports",
    size: "1.8 MB",
    uploadDate: "2024-01-31",
    status: "processed",
  },
  {
    id: "3",
    name: "Invoice_Batch_001.pdf",
    type: "PDF",
    category: "Invoices",
    size: "3.2 MB",
    uploadDate: "2024-01-28",
    status: "processed",
  },
  {
    id: "4",
    name: "Supporting_Documents.zip",
    type: "ZIP",
    category: "Documents",
    size: "5.6 MB",
    uploadDate: "2024-01-25",
    status: "processed",
  },
  {
    id: "5",
    name: "Budget_Planning_Q1.xlsx",
    type: "Excel",
    category: "Budget",
    size: "1.1 MB",
    uploadDate: "2024-01-20",
    status: "processing",
  },
];

export function UploadCenterTab() {
  const [files, setFiles] = useState<UploadedFile[]>(mockUploadedFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "all",
    "Expense Reports",
    "Sales Reports",
    "Invoices",
    "Documents",
    "Budget",
  ];

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      simulateUpload(droppedFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.currentTarget.files;
    if (selectedFiles && selectedFiles.length > 0) {
      simulateUpload(selectedFiles);
    }
  };

  const simulateUpload = (uploadedFiles: FileList) => {
    setIsUploading(true);
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadProgress(100);

        Array.from(uploadedFiles).forEach((file, index) => {
          const newFile: UploadedFile = {
            id: String(files.length + index + 1),
            name: file.name,
            type: file.type.split("/")[1].toUpperCase() || "FILE",
            category: "Documents",
            size: (file.size / 1024 / 1024).toFixed(1) + " MB",
            uploadDate: new Date().toISOString().split("T")[0],
            status: "processed",
          };
          setFiles((prevFiles) => [newFile, ...prevFiles]);
        });

        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }, 500);
      } else {
        setUploadProgress(progress);
      }
    }, 100);
  };

  const handleDeleteFile = (id: string) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleDownloadFile = (fileName: string) => {
    const link = document.createElement("a");
    link.href = "#";
    link.download = fileName;
    link.click();
  };

  const filteredFiles =
    selectedCategory === "all"
      ? files
      : files.filter((f) => f.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (type: string) => {
    return <FileText size={20} className="text-blue-600" />;
  };

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Upload Center
        </h2>
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
          disabled={isUploading}
        >
          <Plus size={16} />
          Select Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          accept=".pdf,.xlsx,.xls,.doc,.docx,.txt,.csv,.zip,.jpg,.png"
        />
      </div>

      {/* Drag and Drop Area */}
      <Card
        className={`p-12 mb-6 border-2 transition-all cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-dashed border-gray-300"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-center">
          <Cloud size={48} className="mx-auto mb-3 text-gray-400" />
          <h3 className="font-semibold text-gray-900 mb-2">
            Drag and drop files here
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            or click to select files from your computer
          </p>
          <p className="text-xs text-gray-500">
            Supported formats: PDF, Excel, Word, CSV, TXT, ZIP, Images
          </p>
        </div>
      </Card>

      {/* Upload Progress */}
      {isUploading && (
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-900">Uploading...</p>
            <p className="text-sm text-gray-600">{uploadProgress.toFixed(0)}%</p>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </Card>
      )}

      {/* Quick Upload Options */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center text-center"
          onClick={() => {
            setSelectedCategory("Expense Reports");
            fileInputRef.current?.click();
          }}
        >
          <Upload size={20} className="mb-2" />
          <span className="text-xs">Expense Report</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center text-center"
          onClick={() => {
            setSelectedCategory("Sales Reports");
            fileInputRef.current?.click();
          }}
        >
          <Upload size={20} className="mb-2" />
          <span className="text-xs">Sales Report</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center text-center"
          onClick={() => {
            setSelectedCategory("Invoices");
            fileInputRef.current?.click();
          }}
        >
          <Upload size={20} className="mb-2" />
          <span className="text-xs">Invoice</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center text-center"
          onClick={() => {
            setSelectedCategory("Documents");
            fileInputRef.current?.click();
          }}
        >
          <Upload size={20} className="mb-2" />
          <span className="text-xs">Document</span>
        </Button>
        <Button
          variant="outline"
          className="h-20 flex flex-col items-center justify-center text-center"
          onClick={() => {
            setSelectedCategory("Budget");
            fileInputRef.current?.click();
          }}
        >
          <Upload size={20} className="mb-2" />
          <span className="text-xs">Budget File</span>
        </Button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Filter by Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="text-sm"
            >
              {cat === "all"
                ? `All Files (${files.length})`
                : `${cat} (${files.filter((f) => f.category === cat).length})`}
            </Button>
          ))}
        </div>
      </div>

      {/* Upload Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-gray-600 text-sm mb-1">Total Files</p>
          <p className="text-2xl font-bold text-gray-900">{files.length}</p>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <p className="text-gray-600 text-sm mb-1">Processed</p>
          <p className="text-2xl font-bold text-green-600">
            {files.filter((f) => f.status === "processed").length}
          </p>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-gray-600 text-sm mb-1">Processing</p>
          <p className="text-2xl font-bold text-blue-600">
            {files.filter((f) => f.status === "processing").length}
          </p>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <p className="text-gray-600 text-sm mb-1">Failed</p>
          <p className="text-2xl font-bold text-red-600">
            {files.filter((f) => f.status === "failed").length}
          </p>
        </Card>
      </div>

      {/* File List */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 mb-3">File History</h3>
        {filteredFiles.length === 0 ? (
          <Card className="p-6 text-center">
            <FileText size={32} className="mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600">No files uploaded in this category</p>
          </Card>
        ) : (
          filteredFiles.map((file) => (
            <Card key={file.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                      <span>{file.type}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.uploadDate}</span>
                      <span>•</span>
                      <Badge className={getStatusColor(file.status)}>
                        {file.status === "processed"
                          ? "Processed"
                          : file.status === "processing"
                            ? "Processing..."
                            : "Failed"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download size={16} className="mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteFile(file.id)}>
                        <Trash2 size={16} className="mr-2 text-red-600" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
