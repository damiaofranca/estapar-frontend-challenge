import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { plansService } from "@/services";
import type { CreatePlanPayload, GetPlansParams, Plan } from "@/services/plans/plans-types";

export const useCreatePlanMutation = (): UseMutationResult<
	void,
	Error,
	CreatePlanPayload
> => plansService.useCreatePlanMutation();

export const useGetPlansQuery = (
	params?: GetPlansParams,
): UseQueryResult<Plan[], Error> => plansService.useGetPlansQuery(params);
