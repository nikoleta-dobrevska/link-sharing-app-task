import typographyHeadingClasses from "./TypographyHeading.module.scss";
import { clsx } from "clsx";

interface HeadingProps {
  variant: "xs" | "s" | "m" | "l" | "xl";
  children: string;
  component: React.ElementType;
}

export const TypographyHeading = ({
  variant,
  children,
  component,
}: HeadingProps) => {
  const Component = component;
  return (
    <Component
      className={clsx(
        typographyHeadingClasses["heading"],
        typographyHeadingClasses[`heading__${variant}`]
      )}
    >
      {children}
    </Component>
  );
};
