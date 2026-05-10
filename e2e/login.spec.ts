import { registerApiMocks } from "./fixtures/api-mocks"
import { expect, test } from "./fixtures/test"
import { LoginPage } from "./pages/LoginPage"

test.describe("Login", () => {
  test("exibe erros de validação quando campos estão vazios", async ({ page }) => {
    await registerApiMocks(page)
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.submit()

    await expect(page.getByText("Informe o usuário")).toBeVisible()
    await expect(page.getByText("Informe a senha")).toBeVisible()
  })

  test("fluxo feliz autentica e redireciona para a home", async ({ page }) => {
    await registerApiMocks(page)
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.fillCredentials("usuario.e2e", "senha.e2e")
    await loginPage.submit()

    await page.waitForURL(/\/$/, { timeout: 30000 })
    await expect(page.getByRole("heading", { name: "Bem-vindo ao Portal Estapar B2B" })).toBeVisible({
      timeout: 30000,
    })
  })

  test("exibe toast com mensagem da API em credenciais inválidas", async ({ page }) => {
    await registerApiMocks(page, { loginStatus: 401, loginBody: { mensagem: "Credenciais inválidas" } })

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.fillCredentials("x", "y")
    await loginPage.submit()

    await expect(page.getByText("Credenciais inválidas")).toBeVisible()
    await expect(page).toHaveURL(/\/login$/)
  })
})
