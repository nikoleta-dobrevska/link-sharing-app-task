import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { userLinksArray } from "@/schemas";

export const fetchAllLinks = async ({ signal }: { signal?: AbortSignal }) => {
  const response = await apiClientAuthorized.get("/user-links", { signal });

  const validatedResponse = userLinksArray.parse(response.data);

  const orderedUserLinksAsc = validatedResponse.sort(
    (prev, next) => prev.order - next.order
  );

  return orderedUserLinksAsc;
};
