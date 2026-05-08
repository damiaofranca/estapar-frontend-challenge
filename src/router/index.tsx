import { lazy, Suspense, type ReactElement } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import { ROUTES } from "@/config/constants";
import GuestRoute from "@/router/guest-route";
import ProtectedRoute from "@/router/protected-route";

const LoginPage = lazy(() => import("@/pages/Login"));
const GaragesPage = lazy(() => import("@/pages/Garages"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));

const withSuspense = (node: ReactElement): ReactElement => (
	<Suspense fallback={null}>{node}</Suspense>
);

const RootLayout = (): ReactElement => <Outlet />;

export const router = createBrowserRouter([
	{
		element: <RootLayout />,
		errorElement: withSuspense(<NotFoundPage />),
		children: [
			{
				element: <GuestRoute />,
				children: [
					{
						path: ROUTES.LOGIN,
						element: withSuspense(<LoginPage />),
					},
				],
			},
			{
				element: <ProtectedRoute />,
				children: [
					{
						index: true,
						element: withSuspense(<GaragesPage />),
					},
				],
			},
		],
	},
]);
