import axios from "axios";
import Cookies from "js-cookie";
const API_URL: string = import.meta.env.VITE_API_URL as string;

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

interface LoginData {
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

    const newLogin: LoginData = {
      token: response.data.token,
    };

    // Get existing logins or initialize empty array
    const existingLogins = JSON.parse(Cookies.get("logins") || "[]");

    // Add new login to array
    existingLogins.push(newLogin);

    // Store updated logins array in cookies
    Cookies.set("logins", JSON.stringify([newLogin]));
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



export interface ProfileResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export const getProfileAll = async (): Promise<ProfileResponse> => {
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

    const response = await axios.get<ProfileResponse>(
      `${API_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Profile error", error.message);
    } else {
      console.log("Profile error", String(error));
    }
    throw error;
  }
};


