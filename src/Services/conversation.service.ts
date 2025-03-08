import axios from "axios";
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

export const createConversation = async (
  token: string,
  title: string,
  documentIds: string[]
): Promise<ConversationResponse> => {
  try {
    const response = await axios.post<ConversationResponse>(
      `${API_URL}/api/conversations`,
      {
        title,
        documentIds,
      },
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
  documentIds: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ConversationsResponse {
  success: boolean;
  count: number;
  data: Conversation[];
}

export const getAllConversations = async (
  token: string
): Promise<ConversationsResponse> => {
  try {
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
