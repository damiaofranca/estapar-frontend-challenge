import "./index.css"
import "react-toastify/ReactToastify.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ToastContainer } from "react-toastify"
import { RouterProvider } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"

import { queryClient } from "./lib/query-client.tsx"

import { router } from "./router/index.tsx"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
)
