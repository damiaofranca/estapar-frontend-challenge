import {
	useQuery,
	useMutation,
	useQueryClient,
	type UseQueryResult,
	type UseMutationResult,
} from "@tanstack/react-query";

import { plansApi } from "./plans-service";
import { QUERY_STALE_TIME } from "@/config/constants";
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
	useGetPlansQuery,
	useCreatePlanMutation,
	getPlans: plansApi.getPlans,
	createPlan: plansApi.createPlan,
};
