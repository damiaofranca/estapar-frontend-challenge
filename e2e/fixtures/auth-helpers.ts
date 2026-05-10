import { expect, type Page } from "@playwright/test"

import { registerApiMocks } from "./api-mocks"
import { LoginPage } from "../pages/LoginPage"
import { WelcomePage } from "../pages/WelcomePage"

export const submitLoginFormToHome = async (page: Page): Promise<void> => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.fillCredentials("usuario.e2e", "senha.e2e")
  await loginPage.submit()

  const welcomePage = new WelcomePage(page)
  await welcomePage.expectLoaded()

  await page.waitForFunction(() => Boolean(localStorage.getItem("@estapar:auth")), { timeout: 15000 })
}

export const performLoginWithMocks = async (page: Page): Promise<void> => {
  await registerApiMocks(page)
  await submitLoginFormToHome(page)
}
