import { registerApiMocks } from "./fixtures/api-mocks"
import { expect, test } from "./fixtures/test"
import { performLoginWithMocks, submitLoginFormToHome } from "./fixtures/auth-helpers"
import { GaragesPage } from "./pages/GaragesPage"

test.describe("Garagens", () => {
  test.beforeEach(async ({ page }) => {
    await performLoginWithMocks(page)
  })

  test("fluxo feliz lista garagens e abre detalhes", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()

    await garagesPage.expectTableShowsGarageName("Garagem 1")
    await garagesPage.openGarageDetails("G1")
    await expect(page.getByText("Carregando detalhes da garagem...")).toBeHidden()
    await expect(page.getByRole("heading", { name: "Garagem G1" })).toBeVisible()
    await garagesPage.closeDrawer()
  })

  test("desliga Mensalista Digital e exibe mensagem orientativa", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()

    await garagesPage.mensalistaDigitalSwitch.click({ force: true })
    await expect(
      page.getByText("Ative o filtro “Mensalista Digital” para visualizar as garagens habilitadas."),
    ).toBeVisible()
  })

  test("busca por nome dispara listagem com parâmetro após debounce", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()
    await garagesPage.expectTableShowsGarageName("Garagem 1")

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes("GetGaragesPaginatedList") &&
        new URL(response.url()).searchParams.get("garageName") === "Garagem 12",
    )

    await garagesPage.searchInput.fill("Garagem 12")
    const response = await responsePromise
    expect(response.ok()).toBeTruthy()

    await garagesPage.expectTableShowsGarageName("Garagem 12")
  })

  test("paginação navega para a segunda página", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()

    await garagesPage.expectPaginationVisible()
    await garagesPage.expectTableShowsGarageName("Garagem 1")

    await garagesPage.goToNextPage()
    await garagesPage.expectTableShowsGarageName("Garagem 11")
  })
})

test.describe("Garagens — erro de API", () => {
  test("mostra toast quando a API de listagem falha", async ({ page }) => {
    await page.unrouteAll({ behavior: "ignoreErrors" })
    await registerApiMocks(page)
    await page.route("**/GetGaragesPaginatedList**", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ mensagem: "Falha ao listar garagens" }),
      })
    })

    await submitLoginFormToHome(page)

    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()

    await expect(page.getByText("Falha ao listar garagens")).toBeVisible()
  })
})
