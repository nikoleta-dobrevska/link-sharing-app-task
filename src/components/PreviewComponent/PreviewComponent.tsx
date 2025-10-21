import { useMemo } from "react";

import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { Typography } from "@/components/typography";
import { mapLinksData } from "@/mapLinksData";
import {
  useAuthenticatedUserProfileDataQuery,
  useLinkProvidersQuery,
  useUserLinksQuery,
} from "@/queries";

import previewComponentClasses from "./PreviewComponent.module.scss";

export const PreviewComponent = () => {
  const {
    data: authenticatedUserProfileData,
    isSuccess: authenticatedUserProfileDataIsSuccess,
  } = useAuthenticatedUserProfileDataQuery();
  const { data: linkProviders } = useLinkProvidersQuery();
  const { data: userLinks } = useUserLinksQuery();

  const mappedLinksData = useMemo(() => {
    return mapLinksData(userLinks, linkProviders);
  }, [linkProviders, userLinks]);

  return (
    <div className={previewComponentClasses["user-data"]}>
      <div className={previewComponentClasses["user-info"]}>
        {authenticatedUserProfileData?.profilePicturePath &&
        authenticatedUserProfileDataIsSuccess ? (
          <img
            alt=""
            src={authenticatedUserProfileData?.profilePicturePath}
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
      <ul
        className={previewComponentClasses["user-links"]}
        aria-label="Your links"
      >
        {mappedLinksData
          ? mappedLinksData.map((linkData) => (
              <li key={linkData?.linkProviderId}>
                <a
                  href={`${linkData?.link}`}
                  aria-label={`Your ${linkData?.linkProviderName} link, opens a new tab`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={previewComponentClasses["user-link"]}
                  style={{
                    backgroundColor: linkData?.backgroundColor,
                    color: linkData?.textColor,
                    border:
                      linkData?.linkProviderName === "Frontend Mentor"
                        ? "1px solid #D9D9D9"
                        : "none",
                  }}
                >
                  <div className={previewComponentClasses["user-link__name"]}>
                    {linkData?.linkProviderName === "Frontend Mentor" ? (
                      <FrontendMentorIcon aria-hidden="true" />
                    ) : (
                      <img
                        src={linkData?.iconSrc}
                        alt=""
                        className={previewComponentClasses["user-link__icon"]}
                      />
                    )}
                    {linkData?.linkProviderName}
                  </div>
                  <ArrowRightIcon aria-hidden="true" />
                </a>
              </li>
            ))
          : Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={previewComponentClasses["user-link-placeholder"]}
              />
            ))}
      </ul>
    </div>
  );
};
