import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

type RenderWithAppContextsOptions = {
  path?: string;
};

export function renderWithAppContexts(
  element: React.ReactNode,
  { path }: RenderWithAppContextsOptions = { path: "/" }
) {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Routes>
          <Route path={path} element={element} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}
