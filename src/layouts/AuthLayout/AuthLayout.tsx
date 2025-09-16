import { Outlet } from "react-router";

import { Logo } from "@/components/ui/Logo";

import authLayoutClasses from "./AuthLayout.module.scss";

export const AuthLayout = () => {
  return (
    <div className={authLayoutClasses["auth-layout"]}>
      <Logo isInNavbar={false} />
      <div className={authLayoutClasses["auth-layout__form"]}>
        <Outlet />
      </div>
    </div>
  );
};
