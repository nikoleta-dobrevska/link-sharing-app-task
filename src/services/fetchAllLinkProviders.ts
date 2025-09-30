import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { linkProvidersResponseSchemaArray } from "@/schemas";

export const fetchAllLinkProviders = async ({
  signal,
}: {
  signal?: AbortSignal;
}) => {
  const response = await apiClientAuthorized.get("/link-providers", { signal });

  const validatedResponse = linkProvidersResponseSchemaArray.safeParse(
    response.data
  );

  if (!validatedResponse?.success) {
    return;
  }

  return validatedResponse?.data;
};
