import type React from "react";
import navItemClasses from "./NavItem.module.scss";
import { clsx } from "clsx";

type NavItem = {
  children: React.ReactNode;
  isActive: boolean;
};

export const NavItem = ({ children, isActive }: NavItem) => {
  return (
    <li
      className={clsx(
        navItemClasses["nav-item"],
        isActive && navItemClasses[`nav-item--active`]
      )}
    >
      {children}
    </li>
  );
};
