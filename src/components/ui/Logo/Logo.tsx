import LogoIcon from "../../../assets/svgr/logo.svg?react";
import { Typography } from "../../typography";
import logoClasses from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={logoClasses["logo"]}>
      <LogoIcon />
      <Typography
        variant="heading"
        size="md"
        component="span"
        color="dark-gray"
        className={logoClasses["logo__title"]}
      >
        devlinks
      </Typography>
    </div>
  );
};
