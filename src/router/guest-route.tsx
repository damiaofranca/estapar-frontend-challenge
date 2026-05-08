import type { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/config/constants";
import { useAuth } from "@/hooks/use-auth";
import { useAuthStoreHydration } from "@/hooks/use-auth-store-hydration";

const GuestRoute = (): ReactElement | null => {
	const hasHydrated = useAuthStoreHydration();
	const { isAuthenticated } = useAuth();

	if (!hasHydrated) {
		return null;
	}

	if (isAuthenticated) {
		return <Navigate to={ROUTES.HOME} replace />;
	}

	return <Outlet />;
};

export default GuestRoute;
