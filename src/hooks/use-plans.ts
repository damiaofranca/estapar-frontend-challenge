import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { plansService } from "@/services";
import type {
	CreatePlanMutationOptions,
	UpdatePlanMutationOptions,
} from "@/services/plans/plans-queries";
import type {
	CreatePlanPayload,
	GetPlansParams,
	Plan,
	UpdatePlanPayload,
} from "@/services/plans/plans-types";

export const useCreatePlanMutation = (
	options?: CreatePlanMutationOptions,
): UseMutationResult<void, Error, CreatePlanPayload> =>
	plansService.useCreatePlanMutation(options);

export const useUpdatePlanMutation = (
	options?: UpdatePlanMutationOptions,
): UseMutationResult<void, Error, UpdatePlanPayload> =>
	plansService.useUpdatePlanMutation(options);

export const useGetPlansQuery = (
	params?: GetPlansParams,
): UseQueryResult<Plan[], Error> => plansService.useGetPlansQuery(params);
