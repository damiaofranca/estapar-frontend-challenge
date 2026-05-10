import { registerApiMocks } from "./fixtures/api-mocks"
import { expect, test } from "./fixtures/test"
import { LoginPage } from "./pages/LoginPage"

test.describe("Rotas para visitante", () => {
  test("redireciona garagens protegidas para o login sem sessão", async ({ page }) => {
    await registerApiMocks(page)

    await page.goto("/garagens")
    await expect(page).toHaveURL(/\/login$/, { timeout: 20000 })

    const loginPage = new LoginPage(page)
    await expect(loginPage.root).toBeVisible({ timeout: 20000 })
  })
})
