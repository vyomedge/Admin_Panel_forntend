// utils/apiClient.js
import axios from "axios";
import { HOST } from "../utils/constant";

// Create Axios instance
const apiClient = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to inject token conditionally
apiClient.interceptors.request.use(
  (config) => {
    // If login or register endpoint, don't add token
    const isAuthRoute = config.url.includes("/api/auth/login") || config.url.includes("/api/auth/register");

    if (!isAuthRoute) {
      // Read token from cookies (assumes token name is 'access_token')
      const token = getCookie("Admin_access");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Helper to get cookie by name
function getCookie(name) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

export { apiClient };
