import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useMemo } from "react";

import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { Typography } from "@/components/typography";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";

import previewComponentClasses from "./PreviewComponent.module.scss";

type PreviewComponentProps = {
  variant: string;
};

export const PreviewComponent = ({ variant }: PreviewComponentProps) => {
  const { data: authenticatedUserProfileData } = useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const { data: linkProviders } = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const { data: userLinks } = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
    enabled: !!linkProviders,
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  const linkElements = useMemo(() => {
    return userLinks?.map((userLink) => {
      const currentLinkProvider = linkProviders?.find(
        (linkProvider) => linkProvider.id === userLink.linkProviderId
      );

      return (
        <a
          key={userLink?.linkProviderId}
          href={`${userLink?.link}`}
          aria-label={`User's ${currentLinkProvider?.name} link, opens a new tab`}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            previewComponentClasses["user-link"],
            variant !== "/preview" &&
              previewComponentClasses["user-link--not-in-preview"]
          )}
          style={{
            backgroundColor: `${currentLinkProvider?.backgroundColor}`,
            color: `${currentLinkProvider?.textColor}`,
            border:
              currentLinkProvider?.name === "Frontend Mentor"
                ? "1px solid #D9D9D9"
                : "none",
          }}
        >
          <div className={previewComponentClasses["user-link__name"]}>
            {currentLinkProvider?.name === "Frontend Mentor" ? (
              <FrontendMentorIcon aria-hidden="true" />
            ) : (
              <img
                src={currentLinkProvider?.iconSrc}
                alt=""
                className={previewComponentClasses["user-link__icon"]}
              />
            )}
            {currentLinkProvider?.name}
          </div>
          <ArrowRightIcon aria-hidden="true" />
        </a>
      );
    });
  }, [linkProviders, userLinks, variant]);

  return (
    <div
      className={clsx(
        previewComponentClasses["user-data"],
        variant !== "/preview" &&
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
            variant !== "/preview" &&
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
        {linkElements}

        {variant === "/links" &&
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
