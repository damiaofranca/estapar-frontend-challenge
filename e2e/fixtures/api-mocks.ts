import type { Page, Route } from "@playwright/test"

import { buildFakeJwt } from "../utils/jwt"

type GarageItem = {
  code: string
  name: string
  address: string
  city: string
  state: string
  region: string
  subsidiary: string
}

const buildAllGarages = (): GarageItem[] =>
  Array.from({ length: 12 }, (_, index) => {
    const n = index + 1
    return {
      code: `G${n}`,
      name: `Garagem ${n}`,
      address: `Rua Teste, ${n}`,
      city: "São Paulo",
      state: "SP",
      region: "Sudeste",
      subsidiary: "SP-01",
    }
  })

const buildGarageDetail = (garageId: string): Record<string, unknown> => ({
  code: garageId,
  name: `Garagem ${garageId}`,
  city: "São Paulo",
  state: "SP",
  region: "Sudeste",
  address: "Rua Teste, 100",
  subsidiary: "SP-01",
  countSpaces: 120,
  occupiedSpaces: 40,
  maxDiscountPercent: 10,
})

const buildPaginatedGarages = (requestUrl: string) => {
  const url = new URL(requestUrl)
  const currentPage = Number(url.searchParams.get("currentPage") ?? "1")
  const pageSize = Number(url.searchParams.get("pageSize") ?? "10")
  const garageName = url.searchParams.get("garageName")?.trim().toLowerCase() ?? ""

  const all = buildAllGarages()
  const filtered =
    garageName.length > 0 ? all.filter((item) => item.name.toLowerCase().includes(garageName)) : all

  const start = (currentPage - 1) * pageSize
  const data = filtered.slice(start, start + pageSize)
  const countRecords = filtered.length
  const hasNextPage = start + pageSize < countRecords ? 1 : 0
  const hasPreviousPage = currentPage > 1 ? 1 : 0

  return {
    pageSize,
    data,
    hasNextPage,
    currentPage,
    countRecords,
    hasPreviousPage,
  }
}

const jsonFulfill = async (route: Route, status: number, body: unknown): Promise<void> => {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  })
}

export type RegisterApiMocksOptions = {
  loginStatus?: number
  loginBody?: unknown
}

export const registerApiMocks = async (page: Page, options: RegisterApiMocksOptions = {}): Promise<void> => {
  const loginStatus = options.loginStatus ?? 200
  const defaultLoginBody = {
    data: {
      token: buildFakeJwt({ name: "Usuário E2E", sub: "e2e-user" }),
      expiredIn: "3600",
    },
    message: "",
    originReturn: "",
    notification: [] as string[],
  }

  await page.route("**/Authenticate", async (route) => {
    if (route.request().method() !== "POST") {
      await route.continue()
      return
    }

    if (loginStatus >= 400) {
      await jsonFulfill(route, loginStatus, options.loginBody ?? { mensagem: "Credenciais inválidas" })
      return
    }

    await jsonFulfill(route, loginStatus, defaultLoginBody)
  })

  await page.route("**/GetGaragesPaginatedList**", async (route) => {
    if (route.request().method() !== "GET") {
      await route.continue()
      return
    }

    const payload = buildPaginatedGarages(route.request().url())
    await jsonFulfill(route, 200, payload)
  })

  await page.route(
    (url) => url.pathname === "/garage",
    async (route) => {
      if (route.request().method() !== "GET") {
        await route.continue()
        return
      }

      const requestUrl = new URL(route.request().url())
      const garageId = requestUrl.searchParams.get("garageId") ?? "G1"
      await jsonFulfill(route, 200, buildGarageDetail(garageId))
    },
  )

  await page.route(
    (url) => url.pathname === "/plans",
    async (route) => {
      if (route.request().method() !== "GET") {
        await route.continue()
        return
      }

      await jsonFulfill(route, 200, [])
    },
  )

  await page.route(
    (url) => url.pathname === "/plan",
    async (route) => {
      if (route.request().method() !== "POST") {
        await route.continue()
        return
      }

      await jsonFulfill(route, 200, {})
    },
  )

  await page.route(
    (url) => url.pathname.startsWith("/plans/"),
    async (route) => {
      if (route.request().method() !== "PUT") {
        await route.continue()
        return
      }

      await jsonFulfill(route, 200, {})
    },
  )
}
