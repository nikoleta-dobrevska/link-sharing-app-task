import { clsx } from "clsx";

import LogoIcon from "@/assets/svgr/logo.svg?react";
import { Typography } from "@/components/typography";

import logoClasses from "./Logo.module.scss";

type LogoProps = {
  className: string;
};

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={logoClasses["logo"]}>
      <LogoIcon aria-hidden={true} />
      <Typography
        component="span"
        variant="heading"
        size="md"
        className={clsx(logoClasses["logo__title"], className)}
      >
        devlinks
      </Typography>
    </div>
  );
};
