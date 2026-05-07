import { api } from "@/lib/axios";

import type {
	Garage,
	GaragePaginatedList,
	GetGarageParams,
	GetGaragesParams,
} from "./garages-types";

const getGarages = (
	params: GetGaragesParams,
): Promise<GaragePaginatedList> =>
	api.get<GaragePaginatedList>("/GetGaragesPaginatedList", { params });

const getGarage = (params: GetGarageParams): Promise<Garage> =>
	api.get<Garage>("/garage", { params });

export const garagesApi = {
	getGarages,
	getGarage,
};
