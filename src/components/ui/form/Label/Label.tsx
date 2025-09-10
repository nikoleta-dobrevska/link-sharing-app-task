import { Typography } from "../../../typography";
import labelClasses from "./Label.module.scss";
import { clsx } from "clsx";

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  color: "dark-gray" | "gray";
}

export const Label = (/*{ children, htmlFor }: LabelProps*/) => {
  return (
    <></>
    /*<Typography
      htmlFor={htmlFor}
      variant="body"
      component={"label"}
      size="sm"
      className={clsx(labelClasses[`form-label--${color}`])}
    >
      {children}
    </Typography>*/
  );
};
