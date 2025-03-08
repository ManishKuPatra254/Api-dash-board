import axios from "axios";
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
  token: string // Pass token as a parameter
): Promise<ReportSummaryResponse> => {
  try {
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
