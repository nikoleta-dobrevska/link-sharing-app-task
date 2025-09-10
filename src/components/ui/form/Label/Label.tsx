import { clsx } from "clsx";

import { Typography } from "@/components/typography";

import labelClasses from "./Label.module.scss";

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
  color: "dark-gray" | "gray";
}

export const Label = ({ children, htmlFor, color }: LabelProps) => {
  return (
    <Typography
      htmlFor={htmlFor}
      variant="body"
      component={"label"}
      size="sm"
      className={clsx(labelClasses[`form-label--${color}`])}
    >
      {children}
    </Typography>
  );
};
