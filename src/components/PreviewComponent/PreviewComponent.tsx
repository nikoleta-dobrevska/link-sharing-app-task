import { useQuery } from "@tanstack/react-query";
import { clsx } from "clsx";
import { useLocation } from "react-router";

import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import { Typography } from "@/components/typography";
import { fetchAllLinkProviders } from "@/services/fetchAllLinkProviders";
import { fetchAllLinks } from "@/services/fetchAllLinks";
import { getAuthenticatedUserProfile } from "@/services/getAuthenticatedUserProfile";

import previewComponentClasses from "./PreviewComponent.module.scss";

export const PreviewComponent = () => {
  const location = useLocation();
  const { pathname } = location;

  const { data: authenticatedUserProfileData } = useQuery({
    queryKey: ["authenticatedUserProfileData"],
    queryFn: getAuthenticatedUserProfile,
  });

  const { data: userLinks } = useQuery({
    queryKey: ["links"],
    queryFn: fetchAllLinks,
  });

  const { data: linkProviders } = useQuery({
    queryKey: ["linkProviders"],
    queryFn: fetchAllLinkProviders,
  });

  return (
    <div
      className={clsx(
        previewComponentClasses["user-data"],
        pathname !== "/preview" &&
          previewComponentClasses["user-data--not-in-preview"]
      )}
    >
      <div className={previewComponentClasses["user-info"]}>
        {authenticatedUserProfileData?.profilePictuePath ? (
          <img
            alt=""
            src={authenticatedUserProfileData?.profilePictuePath}
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
            pathname !== "/preview" &&
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
        {userLinks?.map((userLink) => {
          const lp = linkProviders?.find(
            (l) => l.id === userLink.linkProviderId
          );
          return (
            <a
              key={userLink?.linkProviderId}
              href={`${userLink?.link}`}
              aria-label={`User's ${lp?.name} link, opens a new tab`}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                previewComponentClasses["user-link"],
                pathname !== "/preview" &&
                  previewComponentClasses["user-link--not-in-preview"]
              )}
              style={{
                backgroundColor: `${lp?.backgroundColor}`,
                color: `${lp?.textColor}`,
              }}
            >
              <div className={previewComponentClasses["user-link__name"]}>
                <img
                  src={lp?.iconSrc}
                  alt=""
                  className={previewComponentClasses["user-link__icon"]}
                />
                {lp?.name}
              </div>
              <ArrowRightIcon aria-hidden="true" />
            </a>
          );
        })}

        {pathname === "/links" &&
          userLinks?.length &&
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
