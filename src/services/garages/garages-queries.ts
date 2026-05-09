import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query"

import { garagesApi } from "./garages-service"
import type { Garage, GetGarageParams, GetGaragesParams, GaragePaginatedList } from "./garages-types"

const useGetGaragesQuery = (
  params: GetGaragesParams,
  options?: Omit<UseQueryOptions<GaragePaginatedList, Error>, "queryKey" | "queryFn">,
): UseQueryResult<GaragePaginatedList, Error> =>
  useQuery<GaragePaginatedList, Error>({
    queryKey: ["garages", params],
    queryFn: () => garagesApi.getGarages(params),
    enabled: options?.enabled ?? true,
  })

const useGetGarageQuery = (params: GetGarageParams): UseQueryResult<Garage, Error> =>
  useQuery<Garage, Error>({
    queryKey: ["garage", params.garageId],
    queryFn: () => garagesApi.getGarage(params),
    enabled: !!params.garageId,
  })

export const garagesService = {
  useGetGarageQuery,
  useGetGaragesQuery,
}
