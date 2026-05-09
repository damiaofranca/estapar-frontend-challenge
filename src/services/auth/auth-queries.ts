import { useMutation, type UseMutationResult } from "@tanstack/react-query"

import { authenticationApi } from "./auth-service"
import type { ApiResponse } from "@/types/api-types"
import { ROUTES } from "@/config/constants"
import { setAuthToken } from "@/store/auth-store"
import type { AuthToken, LoginCredentials } from "./auth-types"

const useLogin = (): UseMutationResult<ApiResponse<AuthToken>, Error, LoginCredentials> =>
	useMutation<ApiResponse<AuthToken>, Error, LoginCredentials>({
		mutationFn: authenticationApi.login,
		onSuccess: (response) => {
			setAuthToken(response.data.token)
			window.location.href = ROUTES.HOME
		},
	})

export const authenticationService = {
	login: authenticationApi.login,
	useLogin,
}
