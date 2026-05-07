import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { garagesApi } from "./garages-service";
import { QUERY_STALE_TIME } from "@/config/constants";
import type {
	Garage,
	GetGarageParams,
	GetGaragesParams,
	GaragePaginatedList,
} from "./garages-types";

const useGetGaragesQuery = (
	params: GetGaragesParams,
): UseQueryResult<GaragePaginatedList, Error> =>
	useQuery<GaragePaginatedList, Error>({
		queryKey: ["garages", params],
		queryFn: () => garagesApi.getGarages(params),
		staleTime: QUERY_STALE_TIME.SHORT,
		enabled: true,
	});

const useGetGarageQuery = (
	params: GetGarageParams,
): UseQueryResult<Garage, Error> =>
	useQuery<Garage, Error>({
		queryKey: ["garage", params.garageId],
		queryFn: () => garagesApi.getGarage(params),
		staleTime: QUERY_STALE_TIME.DEFAULT,
		enabled: !!params.garageId,
	});

export const garagesService = {
	useGetGarageQuery,
	useGetGaragesQuery,
};
