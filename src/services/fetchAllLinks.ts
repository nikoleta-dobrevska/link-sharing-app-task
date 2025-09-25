import { apiClientAuthorized } from "@/config/apiClientAuthorized";

export const fetchAllLinks = async () => {
  const response = await apiClientAuthorized.get("/user-links");

  return response.data;
};
