import { clsx } from "clsx";

import LogoIcon from "@/assets/svgr/logo.svg?react";
import { Typography } from "@/components/typography";

import logoClasses from "./Logo.module.scss";

export const Logo = ({ isInNavbar }: { isInNavbar: boolean }) => {
  return (
    <div className={logoClasses["logo"]}>
      <LogoIcon aria-hidden={true} />
      <Typography
        component="span"
        variant="heading"
        size="md"
        className={clsx(
          logoClasses["logo__title"],
          isInNavbar && logoClasses["logo__title--not-visible"]
        )}
      >
        devlinks
      </Typography>
    </div>
  );
};
