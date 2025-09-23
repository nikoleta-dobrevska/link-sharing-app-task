import axios from "axios";

import { type RegisterFormData } from "@/types";

export const registerUser = async (data: RegisterFormData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/register`,
    data
  );

  return response.data;
};
