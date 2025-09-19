import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { queryClient } from "@/config/react-query";
import { RoutePaths } from "@/constants";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Login } from "@/pages/Login";
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
