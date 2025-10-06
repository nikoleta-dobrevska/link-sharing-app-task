import { apiClientAuthorized } from "@/config/apiClientAuthorized";

export const getAuthenticatedUserProfile = async ({
  signal,
}: {
  signal?: AbortSignal;
}) => {
  const response = await apiClientAuthorized.get("/profile", { signal });

  return response.data;
};
