let apiUrl: string | undefined;

// Check the environment variable to determine which URLs to use
if (import.meta.env.VITE_ENV === "production") {
  apiUrl = import.meta.env.VITE_API_URL;
} else if (import.meta.env.VITE_ENV === "staging") {
  apiUrl = import.meta.env.VITE_API_URL;
} else {
  console.error("Invalid environment! Defaulting to staging...");
  apiUrl = import.meta.env.VITE_API_URL;
}

const config = {
  apiUrl: apiUrl as string, // Ensuring the type is a string
};

export default config;
