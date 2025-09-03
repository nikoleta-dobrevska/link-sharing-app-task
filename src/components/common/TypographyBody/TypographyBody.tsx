import typographyBodyClasses from "./TypographyBody.module.scss";
import { clsx } from "clsx";

interface TypographyBodyProps {
  variant: "xs" | "s" | "m" | "l" | "xl";
  children: string;
}

export const TypographyBody = ({ variant, children }: TypographyBodyProps) => {
  return (
    <p
      className={clsx(
        typographyBodyClasses["p"],
        typographyBodyClasses[`p__${variant}`]
      )}
    >
      {children}
    </p>
  );
};
