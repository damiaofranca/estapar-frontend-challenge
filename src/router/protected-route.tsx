import type { ReactElement } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { ROUTES } from "@/config/constants"
import { useAuth } from "@/hooks/use-auth"
import { useAuthStoreHydration } from "@/hooks/use-auth-store-hydration"

const ProtectedRoute = (): ReactElement | null => {
	const hasHydrated = useAuthStoreHydration()
	const auth = useAuth()
	const isAuthenticated = auth.isAuthenticated

	if (!hasHydrated) {
		return null
	}

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />
	}

	return <Outlet />
}

export default ProtectedRoute
