import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { Typography } from "@/components/typography";
import { ONE_DAY_IN_MILLISECONDS } from "@/constants";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";
import { type LinkProviderData, type UserLinkData } from "@/types";

import previewComponentClasses from "./PreviewComponent.module.scss";

type LinkProviderUserLinkPair = {
  userLink?: UserLinkData;
  currentLinkProvider?: LinkProviderData;
};

type LinkProviderUserLinkPairs = LinkProviderUserLinkPair[] | undefined;

export const PreviewComponent = () => {
  const {
    data: authenticatedUserProfileData,
    isSuccess: authenticatedUserProfileDataIsSuccess,
  } = useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  const { data: linkProviders, isSuccess: linkProvidersIsSuccess } = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  const { data: userLinks, isSuccess: userLinksIsSuccess } = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
    staleTime: ONE_DAY_IN_MILLISECONDS,
    gcTime: ONE_DAY_IN_MILLISECONDS,
  });

  const linkProviderUserLinkPairs = useMemo(() => {
    const pairs: LinkProviderUserLinkPairs = userLinks?.map((userLink) => {
      const currentLinkProvider = linkProviders?.find(
        (linkProvider) => linkProvider.id === userLink.linkProviderId
      );

      return {
        userLink: userLink,
        currentLinkProvider: currentLinkProvider,
      };
    });

    return pairs;
  }, [linkProviders, userLinks]);

  return (
    <div className={previewComponentClasses["user-data"]}>
      <div className={previewComponentClasses["user-info"]}>
        {authenticatedUserProfileData?.profilePicture &&
        authenticatedUserProfileDataIsSuccess ? (
          <img
            alt=""
            src={authenticatedUserProfileData?.profilePicture}
            className={previewComponentClasses["profile-pic"]}
          />
        ) : (
          <ElipseIcon
            aria-hidden="true"
            className={previewComponentClasses["profile-pic-placeholder"]}
          />
        )}
        {!authenticatedUserProfileDataIsSuccess ? (
          <div
            className={previewComponentClasses["user-info__names-placeholder"]}
          />
        ) : (
          <Typography
            component="span"
            variant="heading"
            size="sm"
            className={previewComponentClasses["user-info__names"]}
          >
            {authenticatedUserProfileData?.firstName}{" "}
            {authenticatedUserProfileData?.lastName}
          </Typography>
        )}
        {!authenticatedUserProfileDataIsSuccess ? (
          <div
            className={previewComponentClasses["user-info__email-placeholder"]}
          />
        ) : (
          <Typography
            component="span"
            variant="body"
            size="md"
            className={previewComponentClasses["user-info__email"]}
          >
            {authenticatedUserProfileData?.email}
          </Typography>
        )}
      </div>
      <div className={previewComponentClasses["user-links"]}>
        {linkProviderUserLinkPairs &&
        linkProvidersIsSuccess &&
        userLinksIsSuccess
          ? linkProviderUserLinkPairs.map((linkProviderUserLinkPair) => (
              <a
                key={linkProviderUserLinkPair?.userLink?.linkProviderId}
                href={`${linkProviderUserLinkPair?.userLink?.link}`}
                aria-label={`Your ${linkProviderUserLinkPair?.currentLinkProvider?.name} link, opens a new tab`}
                target="_blank"
                rel="noopener noreferrer"
                className={previewComponentClasses["user-link"]}
                style={{
                  backgroundColor: `${linkProviderUserLinkPair.currentLinkProvider?.backgroundColor}`,
                  color: `${linkProviderUserLinkPair?.currentLinkProvider?.textColor}`,
                  border:
                    linkProviderUserLinkPair?.currentLinkProvider?.name ===
                    "Frontend Mentor"
                      ? "1px solid #D9D9D9"
                      : "none",
                }}
              >
                <div className={previewComponentClasses["user-link__name"]}>
                  {linkProviderUserLinkPair?.currentLinkProvider?.name ===
                  "Frontend Mentor" ? (
                    <FrontendMentorIcon aria-hidden="true" />
                  ) : (
                    <img
                      src={
                        linkProviderUserLinkPair?.currentLinkProvider?.iconSrc
                      }
                      alt=""
                      className={previewComponentClasses["user-link__icon"]}
                    />
                  )}
                  {linkProviderUserLinkPair?.currentLinkProvider?.name}
                </div>
                <ArrowRightIcon aria-hidden="true" />
              </a>
            ))
          : Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={previewComponentClasses["user-link-placeholder"]}
              />
            ))}
      </div>
    </div>
  );
};
