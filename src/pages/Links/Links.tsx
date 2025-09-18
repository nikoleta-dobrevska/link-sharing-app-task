import PhoneIcon from "@/assets/svgr/Phone.svg?react";
import RectangleIcon from "@/assets/svgr/Rectangle 15.svg?react";
import SubstractIcon from "@/assets/svgr/Subtract.svg?react";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/ui/nav/Navbar";

import linksClasses from "./Links.module.scss";

export const Links = () => {
  return (
    <div className={linksClasses["page-layout"]}>
      <Navbar activeIndex={0} />
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
            >
              <Button type="button" variant="secondary" size="md">
                + Add new link
              </Button>
              <div
                className={
                  linksClasses[
                    "page-layout__links-section__layout__links__group"
                  ]
                }
              >
                <PhoneIcon />
                <Typography component="h2" variant="heading" size="md">
                  Let's get you started
                </Typography>
                <Typography
                  component="p"
                  variant="body"
                  size="md"
                  className={
                    linksClasses[
                      "page-layout__links-section__layout__links__group__p"
                    ]
                  }
                >
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </Typography>
              </div>
            </div>
          </div>
          <span
            className={
              linksClasses["page-layout__links-section__layout__separator"]
            }
          />
          <div
            className={
              linksClasses["page-layout__links-section__layout__save-btn"]
            }
          >
            <Button type="submit" variant="primary" size="md" disabled={true}>
              Save
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};
