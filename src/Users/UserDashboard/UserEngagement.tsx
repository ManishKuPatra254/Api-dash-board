import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  deleteDocument,
  getDocuments,
  uploadDocument,
} from "@/Services/documents.service";
import { FileIcon, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


// Define the Document interface
interface Document {
  _id: string;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  processingStatus: string;
  createdAt: string;
}

export function DocumentTable() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDelete = async (documentId: string) => {
    try {
      const response = await deleteDocument(documentId);
      if (response.success=== true) {
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc._id !== documentId)
      );
      toast.success("Document deleted successfully!");
      }
    } catch (error) {
      toast("Failed to delete document.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await getDocuments();
      setDocuments(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch documents");
      setLoading(false);
    }
  };

  // Function to format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check if file is PDF
      if (file.type !== "application/pdf") {
        toast.error("Please upload only PDF files");
        e.target.value = ""; // Reset input
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUploadDocuments = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await uploadDocument(selectedFile);
      if (response.success) {
        fetchDocuments(); // Refresh the documents list
        setSelectedFile(null);
        toast.success("File uploaded successfully");
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      setError("Failed to upload file");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex text-xs items-center justify-center h-64 text-destructive">
        {error}
      </div>
    );
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Documents</CardTitle>
            <CardDescription>A list of your recent documents.</CardDescription>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="text-xs">
                <Plus className="h-4 w-4" />
                Upload Document
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Upload Document</AlertDialogTitle>
                <AlertDialogDescription>
                  Choose a file to upload to your document library.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="w-full space-y-2">
                <Label htmlFor="file">File (PDF only)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="text-xs"
                  onClick={() => setSelectedFile(null)}
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleUploadDocuments}
                  disabled={!selectedFile}
                  className="text-xs"
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent>
          <Table className="border rounded-md ">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="py-4 px-6">File Name</TableHead>
                <TableHead className="py-4 px-6">Type</TableHead>
                <TableHead className="py-4 px-6">Size</TableHead>
                <TableHead className="py-4 px-6">Status</TableHead>
                <TableHead className="py-4 px-6">Created At</TableHead>
                <TableHead className="py-4 px-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow
                  key={doc._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium py-4 px-6">
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{doc.originalName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">{doc.fileType}</TableCell>
                  <TableCell className="py-4 px-6">
                    {formatFileSize(doc.fileSize)}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge
                      variant="outline"
                      className={`px-3 py-1 ${
                        doc.processingStatus === "completed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : doc.processingStatus === "processing"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {doc.processingStatus}
                    </Badge>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-gray-600">
                    {formatDate(doc.createdAt)}
                  </TableCell>

                  <TableCell className="py-4 px-6 text-gray-600">
                    <Button
                      onClick={() => handleDelete(doc._id)} // Pass the correct document ID
                      variant="destructive"
                      size="sm"
                      className="text-xs"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Fragment>
  );
}
