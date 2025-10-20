import { useMemo } from "react";

import { useLinkProvidersQuery, useUserLinks } from "@/queries";
import { type LinkProps } from "@/types";

export function useLinksDataForPreview() {
  const { data: linkProviders, isSuccess: linkProvidersIsSuccess } =
    useLinkProvidersQuery();
  const { data: userLinks, isSuccess: userLinksIsSuccess } = useUserLinks();

  const linksDataForPreview = useMemo<LinkProps[]>(() => {
    if (!linkProvidersIsSuccess || !userLinksIsSuccess) {
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
  }, [linkProviders, linkProvidersIsSuccess, userLinks, userLinksIsSuccess]);

  return { linksDataForPreview };
}
