import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";

import { ErrorPage } from "@/pages/ErrorPage";
import { verifyToken } from "@/services/verifyToken";

export const Guard = () => {
  const token = localStorage.getItem("token");

  const verifyTokenQuery = useQuery({
    queryKey: [token],
    queryFn: () => verifyToken(token),
    enabled: !!token,
  });

  if (verifyTokenQuery.isPending) {
    return (
      <div>
        <p role="status" aria-live="polite">
          Loading...
        </p>
      </div>
    );
  }

  if (verifyTokenQuery.isError) {
    return <ErrorPage />;
  }

  if (verifyTokenQuery.isSuccess) {
    return <Outlet />;
  }
};
