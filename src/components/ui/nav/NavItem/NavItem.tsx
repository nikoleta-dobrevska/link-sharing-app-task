import { clsx } from "clsx";
import type React from "react";

import navItemClasses from "./NavItem.module.scss";

type NavItemProps = {
  children: React.ReactNode;
  isActive: boolean;
  href: string;
};

export const NavItem = ({ children, isActive, href }: NavItemProps) => {
  return (
    <li
      className={clsx(
        navItemClasses["nav-item"],
        isActive && navItemClasses[`nav-item--active`]
      )}
    >
      <a
        href={href}
        className={navItemClasses["nav-item-link"]}
        aria-current={isActive ? "page" : undefined}
      >
        {children}
      </a>
    </li>
  );
};
