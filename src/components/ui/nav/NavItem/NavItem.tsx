import { clsx } from "clsx";
import type React from "react";
import { NavLink } from "react-router";

import navItemClasses from "./NavItem.module.scss";

type NavItemProps = {
  children: React.ReactNode;
  to: string;
};

export const NavItem = ({ children, to }: NavItemProps) => {
  return (
    <li className={clsx(navItemClasses["nav-item"])}>
      <NavLink to={to} className={navItemClasses["nav-item-link"]}>
        {children}
      </NavLink>
    </li>
  );
};
