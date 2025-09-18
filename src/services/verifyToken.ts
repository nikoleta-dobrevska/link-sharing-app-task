import axios from "axios";

export const verifyToken = async (token: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/user-links`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
