import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { ONE_DAY_IN_MILLISECONDS } from "@/constants";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";
import { type LinkProps } from "@/types";

export function useLinksDataForPreview() {
  const { data: authenticatedUserProfileData } = useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  const { data: linkProviders } = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  const { data: userLinks } = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

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

  return { linksDataForPreview, authenticatedUserProfileData };
}
