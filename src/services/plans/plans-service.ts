import { api } from "@/lib/axios";

import type { CreatePlanPayload, GetPlansParams, Plan } from "./plans-types";

const createPlan = (payload: CreatePlanPayload): Promise<void> =>{
	return api.post<void>("/plan", payload)
};

const getPlans = (params?: GetPlansParams): Promise<Plan[]> =>{
	return api.get<Plan[]>("/plans",{ params: { garageId: params?.garageId }});
};

export const plansApi = {
	createPlan,
	getPlans,
};
