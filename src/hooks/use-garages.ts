import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query"

import { garagesService } from "@/services"
import type { Garage, GaragePaginatedList, GetGarageParams, GetGaragesParams } from "@/services/garages/garages-types"

export const useGetGaragesQuery = (
  params: GetGaragesParams,
  options?: Omit<UseQueryOptions<GaragePaginatedList, Error>, "queryKey" | "queryFn">,
): UseQueryResult<GaragePaginatedList, Error> => garagesService.useGetGaragesQuery(params, options)

export const useGetGarageQuery = (params: GetGarageParams): UseQueryResult<Garage, Error> =>
  garagesService.useGetGarageQuery(params)
