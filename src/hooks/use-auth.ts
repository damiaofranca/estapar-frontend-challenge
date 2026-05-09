import { useMemo } from "react"

import { ROUTES } from "@/config/constants"
import { useAuthStore } from "@/store/auth-store"
import { tryDecodeAuthTokenClaims } from "@/lib/auth-token"

export interface AuthUser {
	name: string
	username?: string
}

export interface UseAuthReturn {
	logout: () => void
	user: AuthUser | null
	isAuthenticated: boolean
}

export const useAuth = (): UseAuthReturn => {
	const token = useAuthStore((state) => state.token)
	const clearToken = useAuthStore((state) => state.clearToken)

	const decoded = useMemo(() => tryDecodeAuthTokenClaims(token), [token])
	const isAuthenticated = Boolean(token)

	const user: AuthUser | null = !token
		? null
		: decoded
			? {
					name: decoded.name ?? decoded.username ?? decoded.sub ?? "Roberto Freitas",
					username: decoded.username,
				}
			: { name: "Roberto Freitas" }

	const logout = (): void => {
		clearToken()
		window.location.href = ROUTES.LOGIN
	}

	return {
		user,
		logout,
		isAuthenticated,
	}
}
