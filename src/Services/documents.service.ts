import axios from "axios";
import Cookies from "js-cookie";

const API_URL: string = import.meta.env.VITE_API_URL as string;

// get all document

interface DocumentResponse {
  success: boolean;
  count?: number;
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

export const getDocuments = async (): Promise<DocumentResponse> => {
  try {
    const logins = Cookies.get("logins");
    let token = null;
    if (logins) {
      try {
        const parsedLogins = JSON.parse(logins);
        const currentLogin = parsedLogins.find(
          (login: { token: string }) => login.token
        );

        if (currentLogin) {
          token = currentLogin.token;
        }
      } catch (error: unknown) {
        const err = error as Error;
        console.error("Failed to parse logins cookie:", err.message);
      }
    }

    if (!token) {
      throw new Error("No valid token found for the specified role.");
    }

    const response = await axios.get<DocumentResponse>(
      `${API_URL}/api/documents`,
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

export const getDocumentDetailsById = async (
  documentId: string
): Promise<DocumentResponse> => {
  try {
    const logins = Cookies.get("logins");
    let token = null;
    if (logins) {
      try {
        const parsedLogins = JSON.parse(logins);
        const currentLogin = parsedLogins.find(
          (login: { token: string }) => login.token
        );

        if (currentLogin) {
          token = currentLogin.token;
        }
      } catch (error: unknown) {
        const err = error as Error;
        console.error("Failed to parse logins cookie:", err.message);
      }
    }

    if (!token) {
      throw new Error("No valid token found for the specified role.");
    }

    const response = await axios.get<DocumentResponse>(
      `${API_URL}/api/documents/${documentId}`,
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

// file upload

export const uploadDocument = async (file: File): Promise<DocumentResponse> => {
  try {
    const logins = Cookies.get("logins");
    let token = null;

    if (logins) {
      try {
        const parsedLogins = JSON.parse(logins);
        const currentLogin = parsedLogins.find(
          (login: { token: string }) => login.token
        );

        if (currentLogin) {
          token = currentLogin.token;
        }
      } catch (error: unknown) {
        const err = error as Error;
        console.error("Failed to parse logins cookie:", err.message);
      }
    }

    if (!token) {
      throw new Error("No valid token found for the specified role.");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<DocumentResponse>(
      `${API_URL}/api/documents/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("File Uploaded Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// delete by id 

// delete document by ID

export const deleteDocument = async (documentId: string): Promise<{ success: boolean; data: {} }> => {
  try {
    const logins = Cookies.get("logins");
    let token = null;

    if (logins) {
      try {
        const parsedLogins = JSON.parse(logins);
        const currentLogin = parsedLogins.find(
          (login: { token: string }) => login.token
        );

        if (currentLogin) {
          token = currentLogin.token;
        }
      } catch (error: unknown) {
        const err = error as Error;
        console.error("Failed to parse logins cookie:", err.message);
      }
    }

    if (!token) {
      throw new Error("No valid token found for the specified role.");
    }

    const response = await axios.delete<{ success: boolean; data: {} }>(
      `${API_URL}/api/documents/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Document Deleted Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};


