import axios from "axios";

// In production (Vercel), use the full backend URL from env vars
// In development, use /api (proxied by Vite)
const baseURL = import.meta.env.VITE_API_URL || "/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
