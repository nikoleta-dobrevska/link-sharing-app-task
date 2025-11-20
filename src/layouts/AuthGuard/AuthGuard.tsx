import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import { LOCAL_STORAGE_UPDATED_CUSTOM_EVENT, RoutePaths } from "@/constants";
import { getLocalStorageItem } from "@/localStorage";

export const AuthGuard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorageItem("token");

    if (!token) {
      navigate(RoutePaths.login);
    }
  }, [navigate]);

  useEffect(() => {
    const handleLocalStorageTokenChange = (
      localStorageEvent: CustomEvent<{ key: string }>
    ) => {
      if (localStorageEvent.detail.key !== "token") {
        return;
      }

      const token = getLocalStorageItem("token");

      if (!token) {
        navigate(RoutePaths.login);
      }
    };

    window.addEventListener(
      LOCAL_STORAGE_UPDATED_CUSTOM_EVENT as keyof WindowEventMap,
      handleLocalStorageTokenChange as unknown as (event: Event) => void
    );

    return window.removeEventListener(
      LOCAL_STORAGE_UPDATED_CUSTOM_EVENT as keyof WindowEventMap,
      handleLocalStorageTokenChange as unknown as (event: Event) => void
    );
  }, [navigate]);

  return <Outlet />;
};
