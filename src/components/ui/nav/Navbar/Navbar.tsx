import navbarClasses from "./Navbar.module.scss";
import { Logo } from "../../Logo";
import LinksIcon from "../../../../assets/svgr/links.svg?react";
import PreviewIcon from "../../../../assets/svgr/preview.svg?react";
import ProfileDetailsIcon from "../../../../assets/svgr/profile-details.svg?react";
import { Button } from "../../Button";
import { NavItem } from "../NavItem";
import { NavItemLink } from "../NavItemLink";

interface NavbarProps {
  activePage: number;
}

export const Navbar = ({ activePage }: NavbarProps) => {
  return (
    <nav className={navbarClasses["navbar"]}>
      <div className={navbarClasses["navbar__left"]}>
        <Logo />
      </div>
      <div className={navbarClasses["navbar__center"]}>
        <NavItem isActive={activePage === 1 ? true : false}>
          <NavItemLink href="/links">
            <LinksIcon />
            <span className={navbarClasses["navbar__span"]}>Links</span>
          </NavItemLink>
        </NavItem>
        <NavItem isActive={activePage === 2 ? true : false}>
          <NavItemLink href="/profile-details">
            <ProfileDetailsIcon />
            <span className={navbarClasses["navbar__span"]}>
              Profile Details
            </span>
          </NavItemLink>
        </NavItem>
      </div>
      <div className={navbarClasses["navbar__right"]}>
        <Button type="button" variant="secondary" size="md">
          <PreviewIcon className={navbarClasses["navbar__svg--preview"]} />
          <span className={navbarClasses["navbar__span"]}>Preview</span>
        </Button>
      </div>
    </nav>
  );
};
