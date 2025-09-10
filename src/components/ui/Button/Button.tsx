import { clsx } from "clsx";
import type React from "react";

import buttonClasses from "./Button.module.scss";

type ButtonProps = {
  variant: "primary" | "secondary";
  size: "md";
} & React.ComponentProps<"button">;

export const Button = ({
  variant,
  size,
  className,
  children,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={clsx(
        buttonClasses["btn"],
        buttonClasses[`btn--${size}`],
        buttonClasses[`btn--${variant}`],
        className
      )}
    >
      {children}
    </button>
  );
};
