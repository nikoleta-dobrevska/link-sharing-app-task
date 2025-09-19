import axios from "axios";

import { type LoginFormData } from "@/types";

export const loginUser = async (data: LoginFormData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/login`,
    data
  );

  return response.data;
};
