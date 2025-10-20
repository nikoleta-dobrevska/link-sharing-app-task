import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { CustomToastComponent } from "@/components/ui/CustomToastComponent";
import { queryClient } from "@/config/react-query";
import { RoutePaths } from "@/constants";
import { AuthGuard } from "@/layouts/AuthGuard";
import { AuthLayout } from "@/layouts/AuthLayout";
import { PagesLayout } from "@/layouts/PagesLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { Links } from "@/pages/Links";
import { Login } from "@/pages/Login";
import { Preview } from "@/pages/Preview";
import { ProfileDetails } from "@/pages/ProfileDetails";
import { PublicProfilePage } from "@/pages/PublicProfilePage";
import { Register } from "@/pages/Register";

import "@/scss/reset.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={RoutePaths.login} element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path={RoutePaths.register} element={<Register />} />
          </Route>
          <Route
            path={RoutePaths.publicProfilePage}
            element={<PublicProfilePage />}
          />
          <Route element={<AuthGuard />} errorElement={<ErrorPage />}>
            <Route element={<PagesLayout />} errorElement={<ErrorPage />}>
              <Route path={RoutePaths.links} index element={<Links />} />
              <Route
                path={RoutePaths.profileDetails}
                element={<ProfileDetails />}
              />
            </Route>
            <Route path={RoutePaths.preview} element={<Preview />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <CustomToastComponent />
    </QueryClientProvider>
  </StrictMode>
);
