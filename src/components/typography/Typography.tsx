import { clsx } from "clsx";
import typographyClasses from "./Typography.module.scss";

type TypographyProps<C extends React.ElementType> = {
  component?: C;
  children: React.ReactNode;
  variant: "heading" | "body";
  size: "sm" | "md";
  color: "dark-gray" | "dark-purple" | "white";
} & React.ComponentProps<C>;

export const Typography = <C extends React.ElementType = "span">({
  component,
  children,
  variant,
  size,
  color,
  className,
  ...restProps
}: TypographyProps<C>) => {
  const Component = component || "span";

  return (
    <Component
      {...restProps}
      className={clsx(
        typographyClasses[variant],
        typographyClasses[`${variant}--${size}`],
        typographyClasses[`${variant}--${color}`],
        className
      )}
    >
      {children}
    </Component>
  );
};
