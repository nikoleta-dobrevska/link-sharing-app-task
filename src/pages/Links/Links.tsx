import { LinksList } from "@/components/links/LinksList";
import { Typography } from "@/components/typography";

import linksClasses from "./Links.module.scss";

export const Links = () => {
  return (
    <>
      <div className={linksClasses["heading"]}>
        <Typography component="h1" variant="heading" size="md">
          Customize your links
        </Typography>
        <Typography
          component="p"
          variant="body"
          size="md"
          className={linksClasses["heading__subheading"]}
        >
          Add/edit/remove links below and then share all your profiles with the
          world!
        </Typography>
      </div>
      <LinksList />
    </>
  );
};
