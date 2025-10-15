import { useQuery } from "@tanstack/react-query";

import { ONE_DAY_IN_MILLISECONDS } from "@/constants";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";

export function useLinkProvidersQuery() {
  const linkProviders = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  return linkProviders.data;
}

export function useAuthenticatedUserProfileData() {
  const authenticatedUserProfileData = useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  return authenticatedUserProfileData.data;
}

export function useUserLinks() {
  const userLinks = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  return userLinks.data;
}
