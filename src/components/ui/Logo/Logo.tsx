import Icon from "../../../assets/svgr/logo.svg?react";
import { Typography } from "../../typography";
import logoClasses from "./Logo.module.scss";

interface LogoProps {
  hideText: boolean;
}

export const Logo = ({ hideText }: LogoProps) => {
  return (
    <div className={logoClasses["logo"]}>
      <Icon />
      <Typography variant="heading" size="md" component={"h3"}>
        {!hideText && "devlinks"}
      </Typography>
    </div>
  );
};
