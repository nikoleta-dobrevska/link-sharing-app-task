import { clsx } from "clsx";
import typographyClasses from "./Typography.module.scss";

type TypographyProps<C extends React.ElementType> = {
  component: C;
  variant: "heading" | "body";
  size: "sm" | "md";
} & React.ComponentProps<C>;

export const Typography = <C extends React.ElementType = "span">({
  component: Component = "span",
  children,
  variant,
  size,
  className,
  ...restProps
}: TypographyProps<C>) => {
  return (
    <Component
      {...restProps}
      className={clsx(
        typographyClasses[variant],
        typographyClasses[`${variant}--${size}`],
        className
      )}
    >
      {children}
    </Component>
  );
};
