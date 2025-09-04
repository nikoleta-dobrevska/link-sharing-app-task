import navbarClasses from "./Navbar.module.scss";
import Links from "../../../assets/svgr/links.svg?react";
import ProfileDetails from "../../../assets/svgr/profile-details.svg?react";
import { clsx } from "clsx";

interface NavbarProps {
  activeNavItem: number;
}

export const Navbar = ({ activeNavItem }: NavbarProps) => {
  return (
    <nav className={navbarClasses["navbar"]}>
      <div className={navbarClasses["navbar__left"]}>
        {/*logo component goes here */}
      </div>
      <div className={navbarClasses["navbar__center"]}>
        <li
          className={clsx(
            navbarClasses["navbar__center__nav-item"],
            activeNavItem === 1 &&
              navbarClasses["navbar__center__nav-item--active"]
          )}
        >
          <a href="/links">
            <Links />
          </a>
          <a
            href="/links"
            className={clsx(
              navbarClasses["navbar__center__nav-item__link"],
              activeNavItem === 1 &&
                navbarClasses["navbar__center__nav-item__link--active"]
            )}
          >
            Links
          </a>
        </li>
        <li
          className={clsx(
            navbarClasses["navbar__center__nav-item"],
            activeNavItem === 2 &&
              navbarClasses["navbar__center__nav-item--active"]
          )}
        >
          <a href="/profile-details">
            <ProfileDetails />
          </a>
          <a
            href="/profile-details"
            className={clsx(
              navbarClasses["navbar__center__nav-item__link"],
              activeNavItem === 2 &&
                navbarClasses["navbar__center__nav-item__link--active"]
            )}
          >
            Profile Details
          </a>
        </li>
      </div>
      <div className={navbarClasses["navbar__right"]}>
        {/* button component goes here */}
      </div>
    </nav>
  );
};
