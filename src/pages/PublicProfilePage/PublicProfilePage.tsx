import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router";

import ArrowRightIcon from "@/assets/svgr/ArrowRight.svg?react";
import ElipseIcon from "@/assets/svgr/Ellipse 3.svg?react";
import FrontendMentorIcon from "@/assets/svgr/FrontendMentor.svg?react";
import { Typography } from "@/components/typography";
import { useLinkProvidersQuery } from "@/queries";
import { getPublicUserProfileData } from "@/services/getPublicUserProfileData";
import { type LinkProps } from "@/types";

import publicProfilePageClasses from "./PublicProfilePage.module.scss";

export const PublicProfilePage = () => {
  const { userId } = useParams();

  const { data: publicUserProfileData } = useQuery({
    queryKey: [`publicUserProfileDataForUser${userId}`],
    queryFn: () =>
      getPublicUserProfileData(userId ? parseInt(userId) : undefined),
    enabled: !!userId,
  });

  const { linkProviders, linkProvidersIsSuccess } = useLinkProvidersQuery();

  const mappedLinksData = useMemo<LinkProps[] | undefined>(() => {
    if (!linkProvidersIsSuccess || !publicUserProfileData?.userLinks) {
      return [];
    }

    return publicUserProfileData?.userLinks?.map((userLink) => {
      const currentLinkProvider = linkProviders?.find(
        (linkProvider) => linkProvider.id === userLink.linkProviderId
      );

      return {
        link: userLink.link,
        linkProviderId: currentLinkProvider?.id,
        linkProviderName: currentLinkProvider?.name,
        backgroundColor: currentLinkProvider?.backgroundColor,
        textColor: currentLinkProvider?.textColor,
        iconSrc: currentLinkProvider?.iconSrc,
      };
    });
  }, [linkProviders, linkProvidersIsSuccess, publicUserProfileData?.userLinks]);

  return (
    <div className={publicProfilePageClasses["background"]}>
      <div className={publicProfilePageClasses["purple-header"]} />
      <main className={publicProfilePageClasses["user-data-container"]}>
        <section
          className={publicProfilePageClasses["user-info-container"]}
          aria-label="User info"
        >
          {publicUserProfileData?.profilePicturePath ? (
            <img
              alt=""
              src={publicUserProfileData?.profilePicturePath}
              className={publicProfilePageClasses["profile-pic"]}
            />
          ) : (
            <ElipseIcon
              aria-hidden="true"
              className={publicProfilePageClasses["profile-pic-placeholder"]}
            />
          )}
          <div className={publicProfilePageClasses["user-info"]}>
            <Typography
              component="p"
              variant="heading"
              size="md"
              className={publicProfilePageClasses["user-info__names"]}
            >
              {publicUserProfileData?.firstName}{" "}
              {publicUserProfileData?.lastName}
            </Typography>
            <Typography
              component="p"
              variant="body"
              size="md"
              className={publicProfilePageClasses["user-info__email"]}
            >
              {publicUserProfileData?.email}
            </Typography>
          </div>
        </section>
        <ul
          className={publicProfilePageClasses["user-links"]}
          aria-label="Your links"
        >
          {mappedLinksData &&
            mappedLinksData.map((linkData) => (
              <li key={linkData?.linkProviderId}>
                <a
                  href={`${linkData.link}`}
                  aria-label={`User's ${linkData?.linkProviderName} link, opens a new tab`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={publicProfilePageClasses["user-link"]}
                  style={{
                    backgroundColor: linkData?.backgroundColor,
                    color: linkData?.textColor,
                    border:
                      linkData?.linkProviderName === "Frontend Mentor"
                        ? "1px solid #D9D9D9"
                        : "none",
                  }}
                >
                  <div className={publicProfilePageClasses["user-link__name"]}>
                    {linkData?.linkProviderName === "Frontend Mentor" ? (
                      <FrontendMentorIcon aria-hidden="true" />
                    ) : (
                      <img
                        src={linkData?.iconSrc}
                        alt=""
                        className={publicProfilePageClasses["user-link__icon"]}
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
