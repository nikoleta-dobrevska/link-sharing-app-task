import clsx from "clsx";
import { Typography } from "../../../typography";
import navItemLinkClasses from "./NavItemLink.module.scss";

interface NavItemLinkProps {
  href: string;
  children: React.ReactNode;
}

export const NavItemLink = ({ href, children }: NavItemLinkProps) => {
  return (
    <Typography
      component="a"
      href={href}
      variant="heading"
      size="sm"
      color="gray"
      className={clsx(navItemLinkClasses["nav-item-link"])}
    >
      {children}
    </Typography>
  );
};
