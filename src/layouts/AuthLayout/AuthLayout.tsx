import { Outlet } from "react-router";

import { Logo } from "@/components/ui/Logo";

import authLayoutClasses from "./AuthLayout.module.scss";

export const AuthLayout = () => {
  return (
    <main className={authLayoutClasses["auth-layout"]}>
      <Logo />
      <div className={authLayoutClasses["auth-layout__group"]}>
        <Outlet />
      </div>
    </main>
  );
};
