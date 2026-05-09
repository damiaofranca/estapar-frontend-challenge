import { api } from "@/lib/axios"
import { useMutation, useQuery, type UseMutationOptions } from "@tanstack/react-query"

import type { CreatePlanPayload, GetPlansParams, Plan, UpdatePlanPayload } from "./plans-types"

export const plansService = {
  useCreatePlanMutation: (options?: UseMutationOptions<void, Error, CreatePlanPayload>) => {
    return useMutation({
      ...options,
      mutationFn: async (payload: CreatePlanPayload) => {
        return await api.post<void>("/plan", payload)
      },
    })
  },
  useUpdatePlanMutation: (options?: UseMutationOptions<void, Error, UpdatePlanPayload>) => {
    return useMutation({
      ...options,
      mutationFn: async (payload: UpdatePlanPayload) => {
        return await api.put<void>(`/plans/${payload.id}`, payload)
      },
    })
  },
  useGetPlansQuery: (params?: GetPlansParams) => {
    return useQuery({
      queryKey: ["plans", params?.garageId ?? null],
      queryFn: () => api.get<Plan[]>("/plans", { params: { garageId: params?.garageId } }),
      enabled: !!params?.garageId,
    })
  },
}
