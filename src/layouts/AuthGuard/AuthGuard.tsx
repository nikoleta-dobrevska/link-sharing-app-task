import { useEffect, useState } from "react";
import { Outlet } from "react-router";

import { LOCAL_STORAGE_UPDATED_CUSTOM_EVENT } from "@/constants";
import { getLocalStorageItem } from "@/localStorage";

export const AuthGuard = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getLocalStorageItem("token"));
  }, []);

  useEffect(() => {
    const handleLocalStorageTokenChange = (
      localStorageEvent: CustomEvent<{ key: string }>
    ) => {
      if (localStorageEvent.detail.key !== "token") {
        return;
      }

      const token = getLocalStorageItem("token");

      setToken(token);
    };

    window.addEventListener(
      LOCAL_STORAGE_UPDATED_CUSTOM_EVENT as keyof WindowEventMap,
      handleLocalStorageTokenChange as unknown as (event: Event) => void
    );

    return window.removeEventListener(
      LOCAL_STORAGE_UPDATED_CUSTOM_EVENT as keyof WindowEventMap,
      handleLocalStorageTokenChange as unknown as (event: Event) => void
    );
  }, [token]);

  return <Outlet />;
};
