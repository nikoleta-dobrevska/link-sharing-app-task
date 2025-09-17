import { useId } from "react";

import LinksIcon from "@/assets/svgr/links.svg?react";
import PreviewIcon from "@/assets/svgr/preview.svg?react";
import ProfileDetailsIcon from "@/assets/svgr/profile-details.svg?react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NavItem } from "@/components/ui/nav/NavItem";

import navbarClasses from "./Navbar.module.scss";

const navItems = [
  {
    icon: <LinksIcon aria-hidden={true} />,
    href: "/links",
    name: "Links",
  },
  {
    icon: <ProfileDetailsIcon aria-hidden={true} />,
    href: "/profile-details",
    name: "Profile Details",
  },
];

interface NavbarProps {
  activeIndex: number;
}

export const Navbar = ({ activeIndex }: NavbarProps) => {
  const id = useId();

  return (
    <nav
      className={navbarClasses["navbar"]}
      aria-labelledby={id + "-menuLabel"}
    >
      <div className={navbarClasses["navbar__left"]}>
        <Logo />
      </div>
      <h2
        id={id + "-menuLabel"}
        className={navbarClasses["navbar__label--hidden"]}
      >
        Main Menu
      </h2>
      <ul className={navbarClasses["navbar__center"]}>
        {navItems.map((navItem, i) => (
          <NavItem
            key={navItem.name}
            href={navItem.href}
            linkLabel={id + `-navItem${i}Name`}
            isActive={i === activeIndex ? true : false}
          >
            {navItem.icon}
            <span
              id={id + `-navItem${i}Name`}
              className={navbarClasses["navbar__span"]}
            >
              {navItem.name}
            </span>
          </NavItem>
        ))}
      </ul>
      <div className={navbarClasses["navbar__right"]}>
        <Button type="button" variant="secondary" size="md">
          <PreviewIcon
            aria-hidden={true}
            className={navbarClasses["navbar__preview-icon"]}
          />
          <span className={navbarClasses["navbar__span"]}>Preview</span>
        </Button>
      </div>
    </nav>
  );
};
