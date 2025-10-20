import { useMemo } from "react";

import { useLinkProvidersQuery, useUserLinks } from "@/queries";
import { type LinkProps } from "@/types";

export function useLinksDataForPreview() {
  const { linkProviders } = useLinkProvidersQuery();
  const { userLinks } = useUserLinks();

  const linksDataForPreview = useMemo<LinkProps[]>(() => {
    if (!linkProviders || !userLinks) {
      return [];
    }

    return userLinks?.map((userLink) => {
      const currentLinkProvider = linkProviders?.find(
        (linkProvider) => linkProvider.id === userLink.linkProviderId
      );

      return {
        link: userLink.link,
        linkProviderId: currentLinkProvider?.id,
        linkProviderName: currentLinkProvider?.name,
        backgroundColor: currentLinkProvider?.backgroundColor,
        textColor: currentLinkProvider?.textColor,
        iconSrc: currentLinkProvider?.iconSrc,
      };
    });
  }, [linkProviders, userLinks]);

  return { linksDataForPreview };
}
