import { api } from "@/lib/axios"
import type { ApiResponse } from "@/types/api-types"

import type { AuthToken, LoginCredentials } from "./auth-types"
import { useMutation, type UseMutationOptions } from "@tanstack/react-query"

export const authenticationService = {
  useLogin: (options?: UseMutationOptions<ApiResponse<AuthToken>, Error, LoginCredentials>) => {
    return useMutation({
      ...options,
      mutationFn: async (credentials: LoginCredentials) => {
        return await api.post<ApiResponse<AuthToken>>("/Authenticate", credentials)
      },
    })
  },
}
