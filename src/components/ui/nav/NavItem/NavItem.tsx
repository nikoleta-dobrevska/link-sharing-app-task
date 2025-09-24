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
    <li className={navItemClasses["nav-item"]}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(
            navItemClasses["nav-item__link"],
            isActive && navItemClasses["active"]
          )
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
