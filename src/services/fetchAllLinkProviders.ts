import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { linkProvidersResponseSchemaArray } from "@/schemas";

export const fetchAllLinkProviders = async ({
  signal,
}: {
  signal?: AbortSignal;
}) => {
  const response = await apiClientAuthorized.get("/link-providers", { signal });

  const validatedResponse = linkProvidersResponseSchemaArray.parse(
    response.data
  );

  return validatedResponse;
};
