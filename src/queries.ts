import { useQuery } from "@tanstack/react-query";

import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";

export function useLinkProvidersQuery() {
  return useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
  });
}

export function useAuthenticatedUserProfileDataQuery() {
  return useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
  });
}

export function useUserLinksQuery() {
  return useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
  });
}
