import {
	useQuery,
	useMutation,
	type UseQueryResult,
	type UseMutationResult,
} from "@tanstack/react-query";

import { plansApi } from "./plans-service";
import { queryClient } from "@/lib/queryClient";
import type { CreatePlanPayload, GetPlansParams, Plan } from "./plans-types";

const useCreatePlanMutation = (): UseMutationResult<
	void,
	Error,
	CreatePlanPayload
> => {
	return useMutation<void, Error, CreatePlanPayload>({
		mutationFn: plansApi.createPlan,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["plans"] })
		},
	})
}

const useGetPlansQuery = (
	params?: GetPlansParams,
): UseQueryResult<Plan[], Error> =>
	useQuery<Plan[], Error>({
		queryKey: ["plans", params?.garageId ?? null],
		queryFn: () => plansApi.getPlans(params),
		enabled: !!params?.garageId,
	})

export const plansService = {
	useGetPlansQuery,
	useCreatePlanMutation,
	getPlans: plansApi.getPlans,
	createPlan: plansApi.createPlan,
};
