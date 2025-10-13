import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useMemo } from "react";

import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { Typography } from "@/components/typography";
import { ONE_DAY_IN_MILLISECONDS, RoutePaths } from "@/constants";
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

type Variant = keyof typeof RoutePaths;
type VariantValues = (typeof RoutePaths)[Variant];

type PreviewComponentProps = {
  variant: VariantValues;
};

export const PreviewComponent = ({ variant }: PreviewComponentProps) => {
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
    enabled: !!linkProviders,
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
    <div
      className={clsx(
        previewComponentClasses["user-data"],
        variant !== RoutePaths.preview &&
          previewComponentClasses["user-data--not-in-preview"]
      )}
    >
      <div className={previewComponentClasses["user-info"]}>
        {authenticatedUserProfileData?.profilePicture ? (
          <img
            alt=""
            src={authenticatedUserProfileData?.profilePicture}
            className={previewComponentClasses["profile-pic"]}
          />
        ) : (
          <ElipseIcon
            aria-hidden="true"
            className={previewComponentClasses["no-profile-pic"]}
          />
        )}
        <Typography
          component="span"
          variant="heading"
          size="md"
          className={
            variant !== RoutePaths.preview &&
            previewComponentClasses["names--not-in-preview"]
          }
        >
          {authenticatedUserProfileData?.firstName}{" "}
          {authenticatedUserProfileData?.lastName}
        </Typography>
        <Typography
          component="span"
          variant="body"
          size="md"
          className={previewComponentClasses["email"]}
        >
          {authenticatedUserProfileData?.email}
        </Typography>
      </div>
      <div className={previewComponentClasses["user-links"]}>
        {linkProviderUserLinkPairs &&
          linkProviderUserLinkPairs.map((linkProviderUserLinkPairs) => (
            <a
              key={linkProviderUserLinkPairs?.userLink?.linkProviderId}
              href={`${linkProviderUserLinkPairs?.userLink?.link}`}
              aria-label={`User's ${linkProviderUserLinkPairs?.currentLinkProvider?.name} link, opens a new tab`}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                previewComponentClasses["user-link"],
                variant !== RoutePaths.preview &&
                  previewComponentClasses["user-link--not-in-preview"]
              )}
              style={{
                backgroundColor: `${linkProviderUserLinkPairs.currentLinkProvider?.backgroundColor}`,
                color: `${linkProviderUserLinkPairs?.currentLinkProvider?.textColor}`,
                border:
                  linkProviderUserLinkPairs?.currentLinkProvider?.name ===
                  "Frontend Mentor"
                    ? "1px solid #D9D9D9"
                    : "none",
              }}
            >
              <div className={previewComponentClasses["user-link__name"]}>
                {linkProviderUserLinkPairs?.currentLinkProvider?.name ===
                "Frontend Mentor" ? (
                  <FrontendMentorIcon aria-hidden="true" />
                ) : (
                  <img
                    src={
                      linkProviderUserLinkPairs?.currentLinkProvider?.iconSrc
                    }
                    alt=""
                    className={previewComponentClasses["user-link__icon"]}
                  />
                )}
                {linkProviderUserLinkPairs?.currentLinkProvider?.name}
              </div>
              <ArrowRightIcon aria-hidden="true" />
            </a>
          ))}
        {variant === RoutePaths.links &&
          userLinks?.length !== undefined &&
          userLinks?.length <= 5 &&
          Array.from({
            length: 5 - userLinks?.length,
          }).map((_, i) => (
            <div
              key={`linkPlaceholder-${i}`}
              className={previewComponentClasses["link-placeholder"]}
            />
          ))}
      </div>
    </div>
  );
};
