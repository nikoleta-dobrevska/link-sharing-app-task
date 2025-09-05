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

export const Button = ({
  variant,
  type,
  size,
  children,
  isDisabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        buttonClasses["btn"],
        buttonClasses[`btn--${size}`],
        buttonClasses[`btn--${variant}`]
      )}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
    >
      {
        <Typography
          component="span"
          variant="heading"
          size="sm"
          color={variant === "primary" ? "white" : "dark-purple"}
          //not a good approach but i need ideas
        >
          {children}
        </Typography>
      }
    </button>
  );
};
