import axios, { AxiosError, type AxiosInstance } from "axios";
import queryClient from "./queryClient";
import { navigate } from "@/lib/navigation";

export type ApiErrorResponse = {
  errorCode: string;
  message?: string;
  // add other fields that backend returns if you need
};

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient: AxiosInstance = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API: AxiosInstance = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ApiErrorResponse>) => {
    // try to refresh the access token behind the scenes
    if (
      error.response?.status === 401 &&
      error.response.data?.errorCode === "InvalidAccessToken"
    ) {
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(error.config!); // this might be a problem because config could be undefined
      } catch {
        queryClient.clear();
        navigate("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }

    return Promise.reject({
      status: error.response?.status,
      ...(error.response?.data as object),
    });
  }
);

export default API;
