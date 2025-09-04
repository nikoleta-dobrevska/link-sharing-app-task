import { clsx } from "clsx";
import typographyClasses from "./Typography.module.scss";

interface TypographyProps {
  variant: "heading" | "body";
  size: "sm" | "md";
  children: string;
  component: React.ElementType;
}

export const Typography = ({
  variant,
  size,
  children,
  component,
}: TypographyProps) => {
  const Component = component;
  return (
    <Component
      className={clsx(
        typographyClasses[variant],
        typographyClasses[`${variant}__${size}`]
      )}
    >
      {children}
    </Component>
  );
};
