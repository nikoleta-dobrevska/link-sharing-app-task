import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { authenticatedUserSchema } from "@/schemas";

export const getAuthenticatedUserProfile = async ({
  signal,
}: {
  signal?: AbortSignal;
}) => {
  const response = await apiClientAuthorized.get("/profile", { signal });

  const validatedResponse = authenticatedUserSchema.safeParse(response.data);

  if (!validatedResponse?.success) {
    return;
  }

  return validatedResponse?.data;
};
