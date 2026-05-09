import { api } from "@/lib/axios"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"

import type { Garage, GetGarageParams, GetGaragesParams, GaragePaginatedList } from "./garages-types"

export const garagesService = {
  useGetGaragesQuery: (
    params: GetGaragesParams,
    options?: Omit<UseQueryOptions<GaragePaginatedList, Error>, "queryKey" | "queryFn">,
  ) => {
    return useQuery({
      queryKey: ["garages", params],
      queryFn: () => api.get<GaragePaginatedList>("/GetGaragesPaginatedList", { params }),
      enabled: options?.enabled ?? true,
    })
  },
  useGetGarageQuery: (params: GetGarageParams) => {
    return useQuery({
      queryKey: ["garage", params.garageId],
      queryFn: () => api.get<Garage>("/garage", { params }),
      enabled: !!params.garageId,
    })
  },
}
