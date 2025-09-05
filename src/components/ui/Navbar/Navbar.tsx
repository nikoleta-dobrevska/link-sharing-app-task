import navbarClasses from "./Navbar.module.scss";
import { Logo } from "../Logo";
import Links from "../../../assets/svgr/links.svg?react";
import Preview from "../../../assets/svgr/preview.svg?react";
import ProfileDetails from "../../../assets/svgr/profile-details.svg?react";
import { clsx } from "clsx";
import { Button } from "../Button";
import React, { useState, useEffect } from "react";

interface NavbarProps {
  activeNavItem: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeNavItem }) => {
  const [useSvg, setUseSvg] = useState(false);

  useEffect(() => {
    const renderSvgOrText = () => {
      const screenSize = window.innerWidth;

      if (screenSize < 768) {
        setUseSvg(true);
      } else {
        setUseSvg(false);
      }
    };

    renderSvgOrText();

    window.addEventListener("resize", renderSvgOrText);

    return () => {
      window.removeEventListener("resize", renderSvgOrText);
    };
  }, [useSvg]);

  return (
    <nav className={navbarClasses["navbar"]}>
      <div className={navbarClasses["navbar__left"]}>
        <Logo />
      </div>
      <div className={navbarClasses["navbar__center"]}>
        <li
          className={clsx(
            navbarClasses["navbar__center__nav-item"],
            activeNavItem === 1 &&
              navbarClasses["navbar__center__nav-item--active"]
          )}
        >
          <a
            href="/links"
            className={clsx(
              navbarClasses["navbar__center__nav-item__link"],
              activeNavItem === 1 &&
                navbarClasses["navbar__center__nav-item__link--active"]
            )}
          >
            <Links />
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
          <a
            href="/profile-details"
            className={clsx(
              navbarClasses["navbar__center__nav-item__link"],
              activeNavItem === 2 &&
                navbarClasses["navbar__center__nav-item__link--active"]
            )}
          >
            <ProfileDetails />
            Profile Details
          </a>
        </li>
      </div>
      <div className={navbarClasses["navbar__right"]}>
        <Button type="button" variant="secondary" size="md">
          {!useSvg ? "Preview" : <Preview />}
        </Button>
      </div>
    </nav>
  );
};
