import PhoneIcon from "@/assets/svgr/Phone.svg?react";
import { Typography } from "@/components/typography";

import noLinksDescriptionClasses from "./NoLinksDescription.module.scss";

export const NoLinksDescription = () => {
  return (
    <div className={noLinksDescriptionClasses["no-links-desc"]}>
      <PhoneIcon />
      <Typography component="h2" variant="heading" size="md">
        Let's get you started
      </Typography>
      <Typography
        component="p"
        variant="body"
        size="md"
        className={noLinksDescriptionClasses["no-links-desc__p"]}
      >
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </Typography>
    </div>
  );
};
