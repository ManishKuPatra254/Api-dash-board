import axios from "axios";
import Cookies from "js-cookie";
const API_URL: string = import.meta.env.VITE_API_URL as string;
interface ReportSummaryResponse {
  success: boolean;
  data: {
    totalReports: number;
    completedReports: number;
    pendingReports: number;
    startDate: string;
    endDate: string;
  };
}

export const getReportSummary = async (
  startDate: string,
  endDate: string,
): Promise<ReportSummaryResponse> => {
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

    const response = await axios.get<ReportSummaryResponse>(
      `${API_URL}/api/reports/summary`,
      {
        params: { startDate, endDate }, // Send query parameters correctly
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in headers
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data, "Report Summary Response");
    return response.data;
  } catch (error) {
    console.error("Report Summary Fetch Error:", error);
    throw error;
  }
};
