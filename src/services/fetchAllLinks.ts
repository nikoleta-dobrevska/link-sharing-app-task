import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { userLinksArray } from "@/schemas";

export const fetchAllLinks = async ({ signal }: { signal?: AbortSignal }) => {
  const response = await apiClientAuthorized.get("/user-links", { signal });

  const validatedResponse = userLinksArray.safeParse(response.data);

  if (!validatedResponse?.success) {
    return;
  }

  return validatedResponse?.data;
};
