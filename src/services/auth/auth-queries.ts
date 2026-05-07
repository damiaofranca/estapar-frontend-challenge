import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { authenticationApi } from "./auth-service";
import type { ApiResponse } from "@/types/api-types";
import { ROUTES, STORAGE_KEYS } from "@/config/constants";
import type { AuthToken, LoginCredentials } from "./auth-types";

const useLogin = (): UseMutationResult<
	ApiResponse<AuthToken>,
	Error,
	LoginCredentials
> =>
	useMutation<ApiResponse<AuthToken>, Error, LoginCredentials>({
		mutationFn: authenticationApi.login,
		onSuccess: (response) => {
			localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);
			window.location.href = ROUTES.HOME;
		},
	});

export const authenticationService = {
	login: authenticationApi.login,
	useLogin,
};
