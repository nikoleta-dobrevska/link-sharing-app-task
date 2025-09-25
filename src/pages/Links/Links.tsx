import RectangleIcon from "@/assets/svgr/Rectangle 15.svg?react";
import SubstractIcon from "@/assets/svgr/Subtract.svg?react";
import { LinksList } from "@/components/LinksList";
import { Typography } from "@/components/typography";
import { Navbar } from "@/components/ui/nav/Navbar";

import linksClasses from "./Links.module.scss";

export const Links = () => {
  return (
    <div className={linksClasses["page-layout"]}>
      <Navbar />
      <main className={linksClasses["page-layout__center"]}>
        <section className={linksClasses["page-layout__preview-section"]}>
          <aside
            className={linksClasses["page-layout__preview-section__display"]}
          >
            <RectangleIcon
              className={
                linksClasses["page-layout__preview-section__display__rect"]
              }
            />
            <SubstractIcon
              className={
                linksClasses["page-layout__preview-section__display__sub"]
              }
            />
          </aside>
        </section>
        <section className={linksClasses["page-layout__links-section"]}>
          <div className={linksClasses["page-layout__links-section__layout"]}>
            <div
              className={
                linksClasses["page-layout__links-section__layout__heading"]
              }
            >
              <Typography component="h1" variant="heading" size="md">
                Customize your links
              </Typography>
              <Typography
                component="p"
                variant="body"
                size="md"
                className={
                  linksClasses["page-layout__links-section__layout__heading__p"]
                }
              >
                Add/edit/remove links below and then share all your profiles
                with the world!
              </Typography>
            </div>
            <div
              className={
                linksClasses["page-layout__links-section__layout__links"]
              }
            />
            <LinksList />
          </div>
        </section>
      </main>
    </div>
  );
};
