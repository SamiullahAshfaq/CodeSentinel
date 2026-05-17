import axios from "axios";

// Use env var in production, fallback to /api for development
const baseURL = import.meta.env.VITE_API_URL || "/api";

const axiosInstance = axios.create({
  baseURL: baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL,
  withCredentials: true,
});

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
