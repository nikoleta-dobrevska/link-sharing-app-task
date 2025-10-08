/* eslint-disable jsx-a11y/label-has-for */

import { clsx } from "clsx";

import labelClasses from "./Label.module.scss";

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  color: "dark-gray" | "gray";
  className?: string;
};

export const Label = ({ children, htmlFor, color, className }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        labelClasses["form-label"],
        labelClasses[`form-label--${color}`],
        className
      )}
    >
      {children}
    </label>
  );
};
