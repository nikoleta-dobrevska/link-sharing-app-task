import { useNavigate } from "react-router";
import { Slide, toast, ToastContainer } from "react-toastify";

import LinksIcon from "@/assets/svgr/links.svg?react";
import PreviewIcon from "@/assets/svgr/preview.svg?react";
import ProfileDetailsIcon from "@/assets/svgr/profile-details.svg?react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { NavItem } from "@/components/ui/nav/NavItem";
import { RoutePaths } from "@/constants";

import navbarClasses from "./Navbar.module.scss";

const navItems = [
  {
    icon: <LinksIcon aria-hidden={true} />,
    to: RoutePaths.links,
    name: "Links",
  },
  {
    icon: <ProfileDetailsIcon aria-hidden={true} />,
    to: RoutePaths.profileDetails,
    name: "Profile Details",
  },
];

type NavbarProps = {
  variant?: "/preview";
};

export const Navbar = ({ variant }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className={navbarClasses["navbar"]} aria-label="Main Menu">
        <div className={navbarClasses["navbar__left"]}>
          {variant ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => navigate("/links")}
            >
              Back to Editor
            </Button>
          ) : (
            <Logo className={navbarClasses["navbar__logo"]} />
          )}
        </div>
        {!variant && (
          <ul className={navbarClasses["navbar__center"]}>
            {navItems.map((navItem) => (
              <NavItem key={navItem.name} to={navItem.to}>
                {navItem.icon}
                <span className={navbarClasses["navbar__span"]}>
                  {navItem.name}
                </span>
              </NavItem>
            ))}
          </ul>
        )}
        <div className={navbarClasses["navbar__right"]}>
          {variant ? (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                //TODO: change text to the href of profile/id page once it's added
                toast.success("The link has been copied to your clipboard!");
              }}
            >
              Share Link
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => navigate(RoutePaths.preview)}
            >
              <PreviewIcon
                aria-hidden={true}
                className={navbarClasses["navbar__preview-icon"]}
              />
              <span className={navbarClasses["navbar__span"]}>Preview</span>
            </Button>
          )}
        </div>
      </nav>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        role="status"
        closeOnClick={false}
        rtl={false}
        closeButton={false}
        icon={<LinksIcon color="#737373" aria-hidden="true" />}
        transition={Slide}
        theme="dark"
        toastClassName={navbarClasses["toast"]}
      />
    </>
  );
};
