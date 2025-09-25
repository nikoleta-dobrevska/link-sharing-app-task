import { apiClientAuthorized } from "@/config/apiClientAuthorized";
import { type LinksFormData } from "@/types";

type UserLinkPayload = {
  linkProviderId: number;
  link: string;
};

export const createOrUpdateUserLinks = async (data: LinksFormData) => {
  const userLinkPayload: UserLinkPayload[] = data.links.map((item) => ({
    linkProviderId: item.linkProvider.id,
    link: item.link,
  }));

  const response = await apiClientAuthorized.put(
    "/user-links",
    userLinkPayload
  );

  return response.data;
};
