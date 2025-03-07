import axios from "axios";
import Cookies from "js-cookie";
const API_URL: string = import.meta.env.VITE_API_URL as string;

const token = localStorage.getItem("token") || "";
console.log(token);

// register ts api ...................................

interface FormData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const registerUser = async (
  formData: FormData
): Promise<RegisterResponse> => {
  try {
    const responseContact = await axios.post<RegisterResponse>(
      `${API_URL}/api/auth/register`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(responseContact.data, "responseContact");
    return responseContact.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Contact error", error.message);
    } else {
      console.log("Contact error", String(error));
    }
    throw error;
  }
};

// ḷogin ts api......................................

interface FormDataLogin {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token: string;
}

interface TokenData {
  token: string;
}

export const loginUser = async (
  formData: FormDataLogin
): Promise<LoginResponse> => {
  console.log(formData);
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/api/auth/login`,
      formData
    );

    // Create token data object
    const tokenData: TokenData = {
      token: btoa(response.data.token), // Encrypt token using base64
    };

    // Get existing tokens or initialize empty array
    const existingTokens = JSON.parse(Cookies.get("tokens") || "[]");

    // Add new token to array
    existingTokens.push(tokenData);

    // Store updated tokens array in cookies
    Cookies.set("tokens", JSON.stringify(existingTokens), { expires: 7 });

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Login error", error.message);
    } else {
      console.log("Login error", String(error));
    }
    throw error;
  }
};

// Helper function to get decrypted token
export const getDecryptedToken = (): string | null => {
  const tokens = JSON.parse(Cookies.get("tokens") || "[]");
  if (tokens.length === 0) return null;

  // Get the latest token
  const latestToken = tokens[tokens.length - 1];
  return atob(latestToken.token);
};

// logout ts api ...................................

interface LogoutResponse {
  success: boolean;
  data: unknown;
}

interface FormDataLogout {
  email: string;
  password: string;
}

export const logOutUser = async (
  formData: FormDataLogout
): Promise<LogoutResponse> => {
  console.log(formData);
  try {
    const response = await axios.post<LogoutResponse>(
      `${API_URL}/api/auth/logout`,
      formData
    );

    Cookies.remove("tokens");

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Login error", error.message);
    } else {
      console.log("Login error", String(error));
    }
    throw error;
  }
};

// me ts api ...................................

interface MeResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    "--v": number;
  };
}

export const me = async (): Promise<MeResponse> => {
  try {
    const response = await axios.get<MeResponse>(`${API_URL}/api/auth/me`);

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Login error", error.message);
    } else {
      console.log("Login error", String(error));
    }
    throw error;
  }
};
