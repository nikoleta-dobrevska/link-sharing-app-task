import axios from "axios";

import { getLocalStorageItem, removeLocalStorageItem } from "@/localStorage";

export const apiClientAuthorized = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClientAuthorized.interceptors.request.use((config) => {
  const token = getLocalStorageItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClientAuthorized.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      removeLocalStorageItem("token");
      return axios(error.config);
    }

    return error;
  }
);
