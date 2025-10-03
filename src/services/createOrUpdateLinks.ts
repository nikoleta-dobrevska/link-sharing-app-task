import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { type LinksFormData, type UserLinksResponseData } from "@/types";

export const createOrUpdateUserLinks = async (data: LinksFormData) => {
  const userLinksPayload: UserLinksResponseData = data.links.map(
    (item, index) => ({
      linkProviderId: item.linkProvider.id,
      link: item.link,
      order: index,
    })
  );

  const response = await apiClientAuthorized.put(
    "/user-links",
    userLinksPayload
  );

  return response.data;
};
