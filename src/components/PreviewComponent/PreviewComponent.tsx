import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { Typography } from "@/components/typography";
import { useLinksDataForPreview } from "@/hooks/useLinksDataForPreview";
import {
  useAuthenticatedUserProfileData,
  useLinkProvidersQuery,
  useUserLinks,
} from "@/queries";

import previewComponentClasses from "./PreviewComponent.module.scss";

export const PreviewComponent = () => {
  const { linksDataForPreview } = useLinksDataForPreview();
  const {
    authenticatedUserProfileData,
    authenticatedUserProfileDataIsSuccess,
  } = useAuthenticatedUserProfileData();
  const { userLinksIsSuccess } = useUserLinks();
  const { linkProvidersIsSuccess } = useLinkProvidersQuery();

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
      <div className={previewComponentClasses["user-links"]}>
        {linksDataForPreview && linkProvidersIsSuccess && userLinksIsSuccess
          ? linksDataForPreview.map((linksDataForPreview) => (
              <a
                key={linksDataForPreview?.linkProviderId}
                href={`${linksDataForPreview?.link}`}
                aria-label={`Your ${linksDataForPreview?.linkProviderName} link, opens a new tab`}
                target="_blank"
                rel="noopener noreferrer"
                className={previewComponentClasses["user-link"]}
                style={{
                  backgroundColor: `${linksDataForPreview?.backgroundColor}`,
                  color: `${linksDataForPreview?.textColor}`,
                  border:
                    linksDataForPreview?.linkProviderName === "Frontend Mentor"
                      ? "1px solid #D9D9D9"
                      : "none",
                }}
              >
                <div className={previewComponentClasses["user-link__name"]}>
                  {linksDataForPreview?.linkProviderName ===
                  "Frontend Mentor" ? (
                    <FrontendMentorIcon aria-hidden="true" />
                  ) : (
                    <img
                      src={linksDataForPreview?.iconSrc}
                      alt=""
                      className={previewComponentClasses["user-link__icon"]}
                    />
                  )}
                  {linksDataForPreview?.linkProviderName}
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
