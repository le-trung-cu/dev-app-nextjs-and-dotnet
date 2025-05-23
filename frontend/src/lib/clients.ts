// "use client";

import { NEXT_PUBLIC_API_HOST_ADDRESS } from "../constant";
import { SignInResponseType } from "@/app-features/auth/actions";
import axios from "axios";
import { sleep } from "./utils";
const baseURLApi = NEXT_PUBLIC_API_HOST_ADDRESS;

// refresh token from route /api/refresh-token
// use for browser
export function createBrowserClients() {
  // if(typeof window === "undefined") {
  //   return axios;
  // }
  // Create an Axios instance
  const clients = axios.create({
    baseURL: baseURLApi, // Replace with your API base URL
    timeout: 10000, // Optional: request timeout in milliseconds,
  });

  // Function to refresh the token
  let isRefreshing = false;
  let refreshSubscribers = new Array<(token: string) => void>();

  const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
  };

  const onRefreshed = (token: string) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
  };

  // Response Interceptor
  clients.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        // Wait for token refresh to complete
        const retryOriginalRequest = new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest._retry = true;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(clients(originalRequest));
          });
        });

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const data =
              await axios.post<SignInResponseType>("/api/refresh-token");
            const newAccessToken = data.data.accessToken;
            clients.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            isRefreshing = false;
            onRefreshed(newAccessToken);
          } catch (refreshError) {
            isRefreshing = false;
            refreshSubscribers = [];
            return Promise.reject(refreshError);
          }
        }

        return retryOriginalRequest;
      }

      return Promise.reject(error);
    },
  );
  return clients;
}

export const clients = createBrowserClients();
