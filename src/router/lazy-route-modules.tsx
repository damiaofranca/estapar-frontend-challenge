import { lazy } from "react"

export const loginPage = lazy(() => import("@/pages/Login"))
export const garagesPage = lazy(() => import("@/pages/Garages"))
export const welcomePage = lazy(() => import("@/pages/Welcome"))
export const notFoundPage = lazy(() => import("@/pages/NotFound"))
export const mensalistasPage = lazy(() => import("@/pages/Mensalistas"))
