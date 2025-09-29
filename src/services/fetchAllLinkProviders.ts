import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { linkProvidersArray } from "@/schemas";

export const fetchAllLinkProviders = async ({
  signal,
}: {
  signal?: AbortSignal;
}) => {
  const response = await apiClientAuthorized.get("/link-providers", { signal });

  const validatedResponse = linkProvidersArray.safeParse(response.data);

  if (!validatedResponse?.success) {
    return;
  }

  return validatedResponse?.data;
};
