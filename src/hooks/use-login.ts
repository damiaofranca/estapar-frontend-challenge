import type { UseMutationResult } from "@tanstack/react-query";

import { authenticationService, type AuthToken, type LoginCredentials } from "@/services";
import type { ApiResponse } from "@/types/api-types";

export const useLogin = (): UseMutationResult<
	ApiResponse<AuthToken>,
	Error,
	LoginCredentials
> => authenticationService.useLogin();
