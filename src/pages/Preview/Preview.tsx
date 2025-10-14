import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { Typography } from "@/components/typography";
import { Navbar } from "@/components/ui/nav/Navbar";
import { ONE_DAY_IN_MILLISECONDS } from "@/constants";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";
import { type LinkProviderUserLinkPairs } from "@/types";

import previewClasses from "./Preview.module.scss";

export const Preview = () => {
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
    <div className={previewClasses["preview-page-background"]}>
      <div className={previewClasses["purple-container"]}>
        <Navbar variant="/preview" />
      </div>
      <div className={previewClasses["user-data-container"]}>
        <div className={previewClasses["user-info-container"]}>
          {authenticatedUserProfileData?.profilePicturePath ? (
            <img
              alt=""
              src={authenticatedUserProfileData?.profilePicturePath}
              className={previewClasses["profile-pic"]}
            />
          ) : (
            <ElipseIcon
              aria-hidden="true"
              className={previewClasses["profile-pic-placeholder"]}
            />
          )}
          <div className={previewClasses["user-info"]}>
            <Typography component="span" variant="heading" size="md">
              {authenticatedUserProfileData?.firstName}{" "}
              {authenticatedUserProfileData?.lastName}
            </Typography>
            <Typography
              component="span"
              variant="body"
              size="md"
              className={previewClasses["user-info__email"]}
            >
              {authenticatedUserProfileData?.email}
            </Typography>
          </div>
        </div>
        <div className={previewClasses["user-links"]}>
          {linkProviderUserLinkPairs &&
            linkProviderUserLinkPairs.map((linkProviderUserLinkPair) => (
              <a
                key={linkProviderUserLinkPair?.userLink?.linkProviderId}
                href={`${linkProviderUserLinkPair?.userLink?.link}`}
                aria-label={`Your ${linkProviderUserLinkPair?.currentLinkProvider?.name} link, opens a new tab`}
                target="_blank"
                rel="noopener noreferrer"
                className={previewClasses["user-link"]}
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
                <div className={previewClasses["user-link__name"]}>
                  {linkProviderUserLinkPair?.currentLinkProvider?.name ===
                  "Frontend Mentor" ? (
                    <FrontendMentorIcon aria-hidden="true" />
                  ) : (
                    <img
                      src={
                        linkProviderUserLinkPair?.currentLinkProvider?.iconSrc
                      }
                      alt=""
                      className={previewClasses["user-link__icon"]}
                    />
                  )}
                  {linkProviderUserLinkPair?.currentLinkProvider?.name}
                </div>
                <ArrowRightIcon aria-hidden="true" />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};
