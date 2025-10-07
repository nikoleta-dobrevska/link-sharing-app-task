import { apiClientAuthorized } from "@/config/apiClientAuthorized";

export const deleteLink = async (linkProviderId: number) => {
  const response = await apiClientAuthorized.delete(
    `/user-links/${linkProviderId}`
  );

  return response.data;
};
