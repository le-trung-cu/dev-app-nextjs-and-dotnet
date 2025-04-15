"use client";

import { NEXT_PUBLIC_API_HOST_ADDRESS } from "../constant";
import { SignInResponseType } from "@/app-features/auth/actions";
import axios from "axios";
const baseURLApi = NEXT_PUBLIC_API_HOST_ADDRESS;

// refresh token from route /api/refresh-token
// use for browser
function createBrowserClients() {
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

  const onRrefreshed = (token: string) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
  };

  // Request Interceptor
  clients.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor
  clients.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            console.info("browser-client call refresh token");
            const data = await axios.post<SignInResponseType>("/api/refresh-token");

            const newAccessToken = data.data.accessToken;

            clients.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            isRefreshing = false;
            onRrefreshed(newAccessToken);
          } catch (refreshError) {
            isRefreshing = false;
            refreshSubscribers = [];
            return Promise.reject(refreshError);
          }
        }

        // Wait for token refresh to complete
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest._retry = true;
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(clients(originalRequest));
          });
        });
      }

      return Promise.reject(error);
    }
  );
  return clients;
}

export const clients = createBrowserClients();