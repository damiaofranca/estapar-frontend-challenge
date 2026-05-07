import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api-types";

import type { AuthToken, LoginCredentials } from "./auth-types";

const login = (
	credentials: LoginCredentials,
): Promise<ApiResponse<AuthToken>> =>
	api.post<ApiResponse<AuthToken>>("/Authenticate", credentials);

export const authenticationApi = {
	login,
};
