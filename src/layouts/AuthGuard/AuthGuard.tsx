import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet } from "react-router";

import { ErrorPage } from "@/pages/ErrorPage";
import { verifyToken } from "@/services/verifyToken";

export const AuthGuard = () => {
  const [token, setToken] = useState<string | null>(null);
  const existingToken = localStorage.getItem("token");

  setToken(existingToken);

  const verifyTokenQuery = useQuery({
    queryKey: [token],
    queryFn: () => verifyToken(token),
    enabled: !!token,
  });

  if (verifyTokenQuery.isPending) {
    return <p>Loading...</p>;
  }

  if (verifyTokenQuery.isError) {
    return <ErrorPage />;
  }

  return <Outlet />;
};
