import { lazy, Suspense, type ReactElement } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import { ROUTES } from "@/config/constants";
import GuestRoute from "@/router/guest-route";
import ProtectedRoute from "@/router/protected-route";
import AuthenticatedLayout from "@/router/authenticated-layout";

const LoginPage = lazy(() => import("@/pages/Login"));
const GaragesPage = lazy(() => import("@/pages/Garages"));
const WelcomePage = lazy(() => import("@/pages/Welcome"));
const NotFoundPage = lazy(() => import("@/pages/NotFound"));
const MensalistasPage = lazy(() => import("@/pages/Mensalistas"));

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
				element: <AuthenticatedLayout />,
				children: [
					{
						element: <ProtectedRoute />,
						children: [
							{
								index: true,
								element: withSuspense(<WelcomePage />),
							},
							{
								path: ROUTES.GARAGES,
								element: withSuspense(<GaragesPage />),
							},
							{
								path: ROUTES.MENSALISTAS,
								element: withSuspense(<MensalistasPage />),
							},
						],
					},
				],
			},
		],
	},
]);
