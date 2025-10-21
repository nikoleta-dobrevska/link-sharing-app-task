import { type LinkProvidersData, type UserLinksResponseData } from "@/types";

export function mapLinksData(
  userLinks: UserLinksResponseData | undefined,
  linkProviders: LinkProvidersData | undefined
) {
  if (!userLinks || !linkProviders) {
    return [];
  }

  return userLinks
    .map((userLink) => {
      const currentLinkProvider = linkProviders.find(
        (linkProvider) => linkProvider.id === userLink.linkProviderId
      );

      if (!currentLinkProvider) return null;

      return {
        link: userLink.link,
        linkProviderId: currentLinkProvider.id,
        linkProviderName: currentLinkProvider.name,
        backgroundColor: currentLinkProvider.backgroundColor,
        textColor: currentLinkProvider.textColor,
        iconSrc: currentLinkProvider.iconSrc,
      };
    })
    .filter((userLink) => userLink !== null);
}
