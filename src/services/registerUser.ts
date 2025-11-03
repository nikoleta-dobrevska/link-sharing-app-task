import axios, { isAxiosError } from "axios";

import { type RegisterFormData } from "@/types";

export const registerUser = async (data: RegisterFormData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/register`,
      data
    );

    return response.data;
  } catch (error: unknown) {
    let message = "Oops, something went wrong! Please try again later.";

    if (isAxiosError(error)) {
      message =
        error.response?.data?.error?.message ??
        "Oops, something went wrong! Please try again later.";
    }

    throw new Error(message);
  }
};
