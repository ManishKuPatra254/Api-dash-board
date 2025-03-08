import axios from "axios";
import Cookies from "js-cookie";

const API_URL: string = import.meta.env.VITE_API_URL as string;


interface ReportResponse {
    success: boolean;
    data: {
      timeframe: {
        startDate: string;
        endDate: string;
      };
      metrics: {
        totalRequests: number;
        avgResponseTime: number;
        minResponseTime: number;
        maxResponseTime: number;
        successRate: number;
        errorRate: number;
      };
    };
  }
  

  export const getUserReport = async (): Promise<ReportResponse> => {
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
  
      const response = await axios.get<ReportResponse>(
        `${API_URL}/api/reports/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("User Report:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user report:", error);
      throw error;
    }
  };
  