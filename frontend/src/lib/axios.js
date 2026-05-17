import axios from "axios";

// In production (Vercel), use the full backend URL from env vars
// In development, use /api (proxied by Vite)
// Ensure trailing slash for proper path concatenation
const baseURL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "") + "/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Debug: Log all requests to see what's being called
axiosInstance.interceptors.request.use((config) => {
  console.log("🔵 API Request:", config.method?.toUpperCase(), config.url, "Full URL:", config.baseURL + config.url);
  return config;
});

export default axiosInstance;
