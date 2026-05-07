import {
	useMutation,
	useQuery,
	useQueryClient,
	type UseMutationResult,
	type UseQueryResult,
} from "@tanstack/react-query";

import { QUERY_STALE_TIME } from "@/config/constants";

import { plansApi } from "./plans-service";
import type { CreatePlanPayload, GetPlansParams, Plan } from "./plans-types";

const useCreatePlanMutation = (): UseMutationResult<
	void,
	Error,
	CreatePlanPayload
> => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, CreatePlanPayload>({
		mutationFn: plansApi.createPlan,
		onSuccess: (_data, variables) => {
			void queryClient.invalidateQueries({
				queryKey: ["garage", variables.garageId],
			});
		},
	});
};

const useGetPlansQuery = (
	params?: GetPlansParams,
): UseQueryResult<Plan[], Error> =>
	useQuery<Plan[], Error>({
		queryKey: ["plans", params?.garageId ?? null],
		queryFn: () => plansApi.getPlans(params),
		staleTime: QUERY_STALE_TIME.SHORT,
		enabled: true,
	});

export const plansService = {
	createPlan: plansApi.createPlan,
	getPlans: plansApi.getPlans,
	useCreatePlanMutation,
	useGetPlansQuery,
};
