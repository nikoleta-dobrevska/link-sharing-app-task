import navbarClasses from "./Navbar.module.scss";
import { Logo } from "../../Logo";
import LinksIcon from "../../../../assets/svgr/links.svg?react";
import ProfileDetailsIcon from "../../../../assets/svgr/profile-details.svg?react";
import PreviewIcon from "../../../../assets/svgr/preview.svg?react";
import { Button } from "../../Button";
import { NavItem } from "../NavItem";

const navItems = [
  {
    icon: <LinksIcon />,
    href: "/links",
    name: "Links",
  },
  {
    icon: <ProfileDetailsIcon />,
    href: "/profile-details",
    name: "Profile Details",
  },
];

interface NavbarProps {
  activeIndex: number;
}

export const Navbar = ({ activeIndex }: NavbarProps) => {
  return (
    <nav className={navbarClasses["navbar"]}>
      <div className={navbarClasses["navbar__left"]}>
        <Logo />
      </div>
      <div className={navbarClasses["navbar__center"]}>
        {navItems.map((navItem, i) => (
          <NavItem
            href={navItem.href}
            isActive={i === activeIndex ? true : false}
          >
            {navItem.icon}
            <span className={navbarClasses["navbar__span"]}>
              {navItem.name}
            </span>
          </NavItem>
        ))}
      </div>
      <div className={navbarClasses["navbar__right"]}>
        <Button type="button" variant="secondary" size="md">
          <PreviewIcon className={navbarClasses["navbar__preview-icon"]} />
          <span className={navbarClasses["navbar__span"]}>Preview</span>
        </Button>
      </div>
    </nav>
  );
};
