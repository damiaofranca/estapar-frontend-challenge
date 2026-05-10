import { createBrowserRouter, Outlet } from "react-router-dom"
import { createElement, Suspense, type ReactElement } from "react"

import { ROUTES } from "@/config/constants"
import GuestLayout from "@/router/GuestLayout"
import ProtectedRoute from "@/router/ProtectedLayout"
import AuthenticatedLayout from "@/router/AutenticatedLayout"
import { garagesPage, loginPage, mensalistasPage, notFoundPage, welcomePage } from "@/router/lazy-route-modules"

const withSuspense = (node: ReactElement): ReactElement => <Suspense fallback={null}>{node}</Suspense>

export const router = createBrowserRouter([
  {
    element: createElement(() => <Outlet />),
    errorElement: withSuspense(createElement(notFoundPage)),
    children: [
      {
        element: <GuestLayout />,
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
