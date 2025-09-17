import { clsx } from "clsx";
import type React from "react";

import navItemClasses from "./NavItem.module.scss";

type NavItemProps = {
  children: React.ReactNode;
  linkLabel: string;
  isActive: boolean;
  href: string;
};

export const NavItem = ({
  children,
  linkLabel,
  isActive,
  href,
}: NavItemProps) => {
  return (
    <li
      className={clsx(
        navItemClasses["nav-item"],
        isActive && navItemClasses[`nav-item--active`]
      )}
    >
      <a
        aria-labelledby={linkLabel}
        href={href}
        className={navItemClasses["nav-item-link"]}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </a>
    </li>
  );
};
