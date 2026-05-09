import { createElement, Suspense, type ReactElement } from "react"
import { createBrowserRouter } from "react-router-dom"

import { ROUTES } from "@/config/constants"
import GuestRoute from "@/router/guest-route"
import ProtectedRoute from "@/router/protected-route"
import AuthenticatedLayout from "@/router/authenticated-layout"
import {
	garagesPage,
	loginPage,
	mensalistasPage,
	notFoundPage,
	welcomePage,
} from "@/router/lazy-route-modules"
import rootOutlet from "@/router/root-outlet"

const withSuspense = (node: ReactElement): ReactElement => (
	<Suspense fallback={null}>{node}</Suspense>
)

export const router = createBrowserRouter([
	{
		element: createElement(rootOutlet),
		errorElement: withSuspense(createElement(notFoundPage)),
		children: [
			{
				element: <GuestRoute />,
				children: [
					{
						path: ROUTES.LOGIN,
						element: withSuspense(createElement(loginPage)),
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
								element: withSuspense(createElement(welcomePage)),
							},
							{
								path: ROUTES.GARAGES,
								element: withSuspense(createElement(garagesPage)),
							},
							{
								path: ROUTES.MENSALISTAS,
								element: withSuspense(createElement(mensalistasPage)),
							},
						],
					},
				],
			},
		],
	},
])
