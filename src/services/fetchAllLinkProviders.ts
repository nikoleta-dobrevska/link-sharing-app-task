import { apiClientAuthorized } from "@/config/apiClientAuthorized";

export const fetchAllLinkProviders = async () => {
  const response = await apiClientAuthorized.get("/link-providers");

  return response.data;
};
