import axios from "axios";
import { getAuth } from "@clerk/clerk-react";

// Use env var in production, fallback to /api for development
const baseURL = import.meta.env.VITE_API_URL || "/api";

const axiosInstance = axios.create({
  baseURL: baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL,
  withCredentials: true,
});

// Add request interceptor to include Clerk auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const token = await auth.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get Clerk token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Silently ignore root path 404s (favicon, etc)
    if (error.config?.url === "/" || !error.config?.url?.startsWith("/api")) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
