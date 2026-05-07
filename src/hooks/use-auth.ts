import { jwtDecode } from "jwt-decode";

import { ROUTES, STORAGE_KEYS } from "@/config/constants";
import type { DecodedAuthToken } from "@/services/auth/auth-types";

export interface AuthUser {
	name: string;
	username?: string;
}

export interface UseAuthReturn {
	isAuthenticated: boolean;
	user: AuthUser | null;
	logout: () => void;
}

const getDecodedToken = (): DecodedAuthToken | null => {
	const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

	if (!token) return null;

	try {
		return jwtDecode<DecodedAuthToken>(token);
	} catch {
		return null;
	}
};

export const useAuth = (): UseAuthReturn => {
	const decoded = getDecodedToken();
	const isAuthenticated = decoded !== null;

	const user: AuthUser | null = decoded
		? {
				name: decoded.name ?? decoded.username ?? decoded.sub ?? "Usuário",
				username: decoded.username,
			}
		: null;

	const logout = (): void => {
		localStorage.removeItem(STORAGE_KEYS.TOKEN);
		window.location.href = ROUTES.LOGIN;
	};

	return {
		isAuthenticated,
		user,
		logout,
	};
};
