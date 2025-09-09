import type React from "react";
import buttonClasses from "./Button.module.scss";
import { clsx } from "clsx";
import { Typography } from "../../typography";

interface ButtonProps {
  variant: "primary" | "secondary";
  type: "button" | "submit" | "reset";
  size: "md";
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler;
}

interface Colors {
  [variant: string]: string;
}

let colors: Colors = {};
colors = {
  primary: "white",
  secondary: "dark-purple",
};

const getTypographyColor = (variant: string) => {
  return colors[variant].valueOf();
};

export const Button = ({
  variant,
  type,
  size,
  children,
  isDisabled,
  onClick,
}: ButtonProps) => {
  return (
    <Typography
      component="button"
      variant="heading"
      size="sm"
      color={getTypographyColor(variant)}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={clsx(
        buttonClasses["btn"],
        buttonClasses[`btn--${size}`],
        buttonClasses[`btn--${variant}`]
      )}
    >
      {children}
    </Typography>
  );
};
