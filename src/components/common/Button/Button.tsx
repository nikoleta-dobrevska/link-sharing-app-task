import type React from "react";
import buttonClasses from "./Button.module.scss";
import { clsx } from "clsx";

interface ButtonProps {
  variant: "primary" | "secondary";
  type: "button" | "submit" | "reset";
  size: "xs" | "s" | "m" | "l" | "xl";
  label: string;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export const Button = ({
  variant,
  type,
  size,
  label,
  isDisabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        buttonClasses["btn"],
        buttonClasses[`btn__${variant}`],
        buttonClasses[`btn__${size}`],
        isDisabled && buttonClasses["btn--disabled"]
      )}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={label || "Button"}
    >
      {label}
    </button>
  );
};
