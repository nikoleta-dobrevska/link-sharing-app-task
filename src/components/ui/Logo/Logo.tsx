import LogoIcon from "@/assets/svgr/logo.svg?react";
import { Typography } from "@/components/typography";

import logoClasses from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={logoClasses["logo"]}>
      <LogoIcon />
      <Typography
        component="span"
        variant="heading"
        size="md"
        className={logoClasses["logo__title"]}
      >
        devlinks
      </Typography>
    </div>
  );
};
