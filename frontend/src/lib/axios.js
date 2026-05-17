import axios from "axios";

// In production (Vercel), use the full backend URL from env vars
// In development, use /api (proxied by Vite)
// Ensure trailing slash for proper path concatenation
const baseURL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "") + "/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Add response error handling to suppress harmless errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ignore root path 404s (favicon, health checks, etc)
    if (error.config?.url === "/" || error.response?.status === 404) {
      console.debug("Harmless 404:", error.config?.url);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
