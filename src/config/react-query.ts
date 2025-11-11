import { QueryClient } from "@tanstack/react-query";

import { ONE_DAY_IN_MILLISECONDS } from "@/constants";

export const QUERY_CLIENT_OPTIONS = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: ONE_DAY_IN_MILLISECONDS,
      gcTime: ONE_DAY_IN_MILLISECONDS,
    },
  },
};

export const queryClient = new QueryClient(QUERY_CLIENT_OPTIONS);
