import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

import { QUERY_STALE_TIME } from '@/config/constants'

interface QueryProviderProps {
  children: ReactNode
}

const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: QUERY_STALE_TIME.DEFAULT,
        refetchOnWindowFocus: false,
      },
    },
  })

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [client] = useState<QueryClient>(() => createQueryClient())

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
