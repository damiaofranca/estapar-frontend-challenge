import { api } from "@/lib/axios";

import type { CreatePlanPayload, GetPlansParams, Plan } from "./plans-types";

const createPlan = (payload: CreatePlanPayload): Promise<void> =>
	api.post<void>("/plan", payload);

const getPlans = (params?: GetPlansParams): Promise<Plan[]> =>
	api.get<Plan[]>(
		"/plans",
		params?.garageId !== undefined
			? { params: { garageId: params.garageId } }
			: undefined,
	);

export const plansApi = {
	createPlan,
	getPlans,
};
