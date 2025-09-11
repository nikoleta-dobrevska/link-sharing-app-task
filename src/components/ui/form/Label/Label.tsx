/* eslint-disable jsx-a11y/label-has-for */

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
      component="label"
      size="sm"
      className={labelClasses[`form-label--${color}`]}
    >
      {children}
    </Typography>
  );
};
