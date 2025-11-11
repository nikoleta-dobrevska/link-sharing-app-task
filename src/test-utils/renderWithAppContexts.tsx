import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

import { CustomToastComponent } from "@/components/ui/CustomToastComponent";
import { QUERY_CLIENT_OPTIONS } from "@/config/react-query";

type RenderWithAppContextsOptions = {
  path?: string;
  initialEntries?: string[];
  usesReactToastify?: boolean;
};

export function renderWithAppContexts(
  element: React.ReactNode,
  {
    path = "/",
    initialEntries = ["/"],
    usesReactToastify = false,
  }: RenderWithAppContextsOptions = {}
) {
  const queryClient = new QueryClient(QUERY_CLIENT_OPTIONS);

  return render(element, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path={path} element={children} />
          </Routes>
          {usesReactToastify && <CustomToastComponent />}
        </MemoryRouter>
      </QueryClientProvider>
    ),
  });
}
