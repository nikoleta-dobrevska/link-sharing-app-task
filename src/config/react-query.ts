import { QueryClient } from "@tanstack/react-query";

import { ONE_DAY_IN_MILLISECONDS } from "@/constants";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_DAY_IN_MILLISECONDS,
      gcTime: ONE_DAY_IN_MILLISECONDS,
    },
  },
});
