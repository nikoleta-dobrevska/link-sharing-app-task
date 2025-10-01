import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { ImageUploader } from "@/components/ui/form/ImageUploader";
import { queryClient } from "@/config/react-query";
import { RoutePaths } from "@/constants";
import { AuthGuard } from "@/layouts/AuthGuard";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { Links } from "@/pages/Links";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";

import "@/scss/reset.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="image" element={<ImageUploader />} />
          <Route path={RoutePaths.login} element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path={RoutePaths.register} element={<Register />} />
          </Route>
          <Route element={<AuthGuard />} errorElement={<ErrorPage />}>
            <Route path={RoutePaths.links} index element={<Links />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
