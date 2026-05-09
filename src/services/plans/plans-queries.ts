import {
  useQuery,
  useMutation,
  type UseMutationOptions,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query"

import { plansApi } from "./plans-service"
import { queryClient } from "@/lib/queryClient"
import type { CreatePlanPayload, GetPlansParams, Plan, UpdatePlanPayload } from "./plans-types"

export type CreatePlanMutationOptions = Omit<UseMutationOptions<void, Error, CreatePlanPayload>, "mutationFn">

export type UpdatePlanMutationOptions = Omit<UseMutationOptions<void, Error, UpdatePlanPayload>, "mutationFn">

const invalidatePlansQueries = (): Promise<void> => queryClient.invalidateQueries({ queryKey: ["plans"] })

const useCreatePlanMutation = (
  options?: CreatePlanMutationOptions,
): UseMutationResult<void, Error, CreatePlanPayload> => {
  const { onSuccess, ...rest } = options ?? {}

  return useMutation<void, Error, CreatePlanPayload>({
    ...rest,
    mutationFn: plansApi.createPlan,
    onSuccess: (...args) => {
      void invalidatePlansQueries()
      onSuccess?.(...args)
    },
  })
}

const useUpdatePlanMutation = (
  options?: UpdatePlanMutationOptions,
): UseMutationResult<void, Error, UpdatePlanPayload> => {
  const { onSuccess, ...rest } = options ?? {}

  return useMutation<void, Error, UpdatePlanPayload>({
    ...rest,
    mutationFn: plansApi.updatePlan,
    onSuccess: (...args) => {
      void invalidatePlansQueries()
      onSuccess?.(...args)
    },
  })
}

const useGetPlansQuery = (params?: GetPlansParams): UseQueryResult<Plan[], Error> =>
  useQuery<Plan[], Error>({
    queryKey: ["plans", params?.garageId ?? null],
    queryFn: () => plansApi.getPlans(params),
    enabled: !!params?.garageId,
  })

export const plansService = {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  getPlans: plansApi.getPlans,
  createPlan: plansApi.createPlan,
  updatePlan: plansApi.updatePlan,
}
