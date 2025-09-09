import Icon from "../../../assets/svgr/logo.svg?react";
import { Typography } from "../../typography";
import logoClasses from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={logoClasses["logo"]}>
      <Icon />
      <Typography
        variant="heading"
        size="md"
        component={"h3"}
        className={logoClasses["logo__h3"]}
      >
        devlinks
      </Typography>
    </div>
  );
};
