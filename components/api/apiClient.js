import axios from "axios";
import { API_BASE_URL } from "../config/config";

// Create Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (for adding auth token)
apiClient.interceptors.request.use(
  async (config) => {
    // Get token from local storage (if exists)
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (for handling errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data);
    return Promise.reject(error);
  }
);

export default apiClient;
