import { useQuery } from "@tanstack/react-query";

import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";

export function useLinkProvidersQuery() {
  const { data: linkProviders, isSuccess: linkProvidersIsSuccess } = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
  });

  return { linkProviders, linkProvidersIsSuccess };
}

export function useAuthenticatedUserProfileData() {
  const {
    data: authenticatedUserProfileData,
    isSuccess: authenticatedUserProfileDataIsSuccess,
  } = useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
  });

  return {
    authenticatedUserProfileData,
    authenticatedUserProfileDataIsSuccess,
  };
}

export function useUserLinks() {
  const { data: userLinks, isSuccess: userLinksIsSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
  });

  return { userLinks, userLinksIsSuccess };
}
