import { useMemo } from "react";

import { useLinkProvidersQuery, useUserLinks } from "@/queries";

type LinkProps = {
  link?: string;
  linkProviderId?: number;
  linkProviderName?: string;
  backgroundColor?: string;
  textColor?: string;
  iconSrc?: string;
};

export function useLinksDataForPreview() {
  const { linkProviders, linkProvidersIsSuccess } = useLinkProvidersQuery();
  const { userLinks, userLinksIsSuccess } = useUserLinks();

  const linksDataForPreview = useMemo<LinkProps[] | undefined>(() => {
    if (!linkProvidersIsSuccess || !userLinksIsSuccess) {
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
  }, [linkProviders, linkProvidersIsSuccess, userLinks, userLinksIsSuccess]);

  return { linksDataForPreview };
}
