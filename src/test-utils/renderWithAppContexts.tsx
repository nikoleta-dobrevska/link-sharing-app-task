import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { CustomToastComponent } from "@/components/ui/CustomToastComponent";

type RenderWithAppContextsOptions = {
  path?: string;
  initialEntries?: string[];
  usesReactToastify?: boolean;
};

export function renderWithAppContexts(
  element: React.ReactNode,
  { usesReactToastify }: RenderWithAppContextsOptions = {
    usesReactToastify: false,
  },
  { path }: RenderWithAppContextsOptions = { path: "/" },
  { initialEntries }: RenderWithAppContextsOptions = {
    initialEntries: ["/"],
  }
) {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      </MemoryRouter>
      {usesReactToastify && <CustomToastComponent />}
    </QueryClientProvider>
  );
}
