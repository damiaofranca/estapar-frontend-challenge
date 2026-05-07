import { QueryClient } from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/config/constants";

export const createQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false,
			staleTime: QUERY_STALE_TIME.DEFAULT,
		},
	},
});
