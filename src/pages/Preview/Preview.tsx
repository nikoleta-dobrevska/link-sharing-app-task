import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { PreviewToolbar } from "@/components/PreviewToolbar";
import { Typography } from "@/components/typography";
import { useLinksDataForPreview } from "@/hooks/useLinksDataForPreview";

import previewClasses from "./Preview.module.scss";

export const Preview = () => {
  const { authenticatedUserProfileData, linksDataForPreview } =
    useLinksDataForPreview();

  return (
    <div className={previewClasses["background"]}>
      <header className={previewClasses["purple-header"]}>
        <PreviewToolbar />
      </header>
      <main className={previewClasses["user-data-container"]}>
        <section
          className={previewClasses["user-info-container"]}
          aria-label="Your info"
        >
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
            <Typography
              component="p"
              variant="heading"
              size="md"
              className={previewClasses["user-info__names"]}
            >
              {authenticatedUserProfileData?.firstName}{" "}
              {authenticatedUserProfileData?.lastName}
            </Typography>
            <Typography
              component="p"
              variant="body"
              size="md"
              className={previewClasses["user-info__email"]}
            >
              {authenticatedUserProfileData?.email}
            </Typography>
          </div>
        </section>
        <ul className={previewClasses["user-links"]} aria-label="Your links">
          {linksDataForPreview &&
            linksDataForPreview.map((linkData) => (
              <li key={linkData?.linkProviderId}>
                <a
                  href={`${linkData.link}`}
                  aria-label={`Your ${linkData?.linkProviderName} link, opens a new tab`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={previewClasses["user-link"]}
                  style={{
                    backgroundColor: `${linkData?.backgroundColor}`,
                    color: `${linkData?.textColor}`,
                    border:
                      linkData?.linkProviderName === "Frontend Mentor"
                        ? "1px solid #D9D9D9"
                        : "none",
                  }}
                >
                  <div className={previewClasses["user-link__name"]}>
                    {linkData?.linkProviderName === "Frontend Mentor" ? (
                      <FrontendMentorIcon aria-hidden="true" />
                    ) : (
                      <img
                        src={linkData?.iconSrc}
                        alt=""
                        className={previewClasses["user-link__icon"]}
                      />
                    )}
                    {linkData?.linkProviderName}
                  </div>
                  <ArrowRightIcon aria-hidden="true" />
                </a>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
};
