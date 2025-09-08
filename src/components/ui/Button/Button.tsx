import { clsx } from "clsx";
import type React from "react";

import buttonClasses from "./Button.module.scss";

interface ButtonProps {
  variant: "primary" | "secondary";
  type: "button" | "submit" | "reset";
  size: "md";
  children: string;
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
      {children}
    </button>
  );
};
