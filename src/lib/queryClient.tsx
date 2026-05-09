import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 0,
			retry: false,
			staleTime: 0,
			refetchOnWindowFocus: false,
		},
	},
})
