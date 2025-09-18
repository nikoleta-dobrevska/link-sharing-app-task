import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { queryClient } from "@/config/react-query";
import { AuthLayout } from "@/layouts/AuthLayout";
import { Guard } from "@/layouts/Guard";
import { ErrorPage } from "@/pages/ErrorPage";
import { Links } from "@/pages/Links";
import { Register } from "@/pages/Register";

import "@/scss/reset.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Links />} />
          <Route element={<AuthLayout />}>
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<Guard />} errorElement={<ErrorPage />}>
            <Route path="links" index element={<Links />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
