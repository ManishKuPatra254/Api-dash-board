import axios from "axios";
import Cookies from "js-cookie";
const API_URL: string = import.meta.env.VITE_API_URL as string;

interface ConversationResponse {
  success: boolean;
  data: {
    title: string;
    messages: any[];
    documentIds: string[];
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface CreateConversationRequest {
  title: string;
  documentIds: string[];
}

export const createConversation = async (
  formData: CreateConversationRequest
): Promise<ConversationResponse> => {
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

    const response = await axios.post(
      `${API_URL}/api/conversations`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Conversation Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
};

// get all conversation

interface Conversation {
  _id: string;
  title: string;
  messages: any[];
  documentIds: string[] | Document[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ConversationsResponse {
  success: boolean;
  count: number;
  data: Conversation[];
}

export const getAllConversations = async (): Promise<ConversationsResponse> => {
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

    const response = await axios.get<ConversationsResponse>(
      `${API_URL}/api/conversations`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Conversations:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};

// get conversation by id

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
  __v: number;
}

interface Conversation {
  _id: string;
  title: string;
  messages: any[];
  documentIds: Document[] | string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  data: Conversation;
}

export const getConversationById = async (
  conversationId: string
): Promise<ApiResponse> => {
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

    const response = await axios.get<ConversationResponse>(
      `${API_URL}/api/conversations/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data, "Conversation Details Response");
    return response.data;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

// delete by id

interface DeleteConversationResponse {
  success: boolean;
  data: {};
}

export const deleteConversationById = async (
  conversationId: string
): Promise<DeleteConversationResponse> => {
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

    const response = await axios.delete<DeleteConversationResponse>(
      `${API_URL}/api/conversations/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Conversation Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw error;
  }
};
