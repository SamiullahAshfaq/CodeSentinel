import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../lib/axios";

export const useAxiosAuth = () => {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
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

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [isSignedIn, getToken]);
};
