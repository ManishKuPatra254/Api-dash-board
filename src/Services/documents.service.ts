import axios from "axios";



// get all document

interface DocumentResponse {
  success: boolean;
  count: number;
  data: Document[];
}

interface Document {
  _id: string;
  fileName: string;
  originalName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  extractedText: string;
  processingStatus: string;
  processingError: string | null;
  createdAt: string;
}

export const getDocuments = async (token: string): Promise<DocumentResponse> => {
  try {
    const response = await axios.get<DocumentResponse>(
      "https://kai-rbh7.onrender.com/api/documents",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data, "Documents Response");
    return response.data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};


// get doucument by id

interface DocumentResponse {
  success: boolean;
  Document: {
    _id: string;
    fileName: string;
    originalName: string;
    fileType: string;
    fileSize: number;
    filePath: string;
    extractedText: string;
    processingStatus: string;
    processingError: string | null;
    createdAt: string;
  };
}

export const getDocumentDetails = async (
  documentId: string,
  token: string // Pass token as a parameter
): Promise<DocumentResponse> => {
  try {
    const response = await axios.get<DocumentResponse>(
      `https://kai-rbh7.onrender.com/api/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in headers
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data, "Document Details Response");
    return response.data;
  } catch (error) {
    console.error("Document Fetch Error:", error);
    throw error;
  }
};

// delte documents by id 

export const deleteDocument = async (token: string, documentId: string): Promise<void> => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Document deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

