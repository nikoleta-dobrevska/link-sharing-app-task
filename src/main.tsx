import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { queryClient } from "@/config/react-query";
import { AuthGuard } from "@/layouts/AuthGuard";
import { AuthLayout } from "@/layouts/AuthLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { Links } from "@/pages/Links";
import { Register } from "@/pages/Register";

import "@/scss/reset.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<AuthGuard />} errorElement={<ErrorPage />}>
            <Route path="links" index element={<Links />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
