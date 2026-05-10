import { performLoginWithMocks } from "./fixtures/auth-helpers"
import { expect, test } from "./fixtures/test"
import { AppLayoutPage } from "./pages/AppLayoutPage"
import { GaragesPage } from "./pages/GaragesPage"
import { LoginPage } from "./pages/LoginPage"
import { MensalistasPage } from "./pages/MensalistasPage"
import { WelcomePage } from "./pages/WelcomePage"

test.describe("Navegação autenticada", () => {
  test.beforeEach(async ({ page }) => {
    await performLoginWithMocks(page)
  })

  test("navega da home para garagens pelo card e pela sidebar", async ({ page }) => {
    const welcomePage = new WelcomePage(page)
    const garagesPage = new GaragesPage(page)
    const layout = new AppLayoutPage(page)

    await welcomePage.goToGaragesFromCard()
    await garagesPage.expectTableShowsGarageName("Garagem 1")

    await layout.goToMensalistas()
    const mensalistasPage = new MensalistasPage(page)
    await mensalistasPage.expectLoaded()

    await layout.goToGaragens()
    await garagesPage.expectTableShowsGarageName("Garagem 1")
  })

  test("logout retorna para o login", async ({ page }) => {
    const layout = new AppLayoutPage(page)
    await layout.logout()

    const loginPage = new LoginPage(page)
    await loginPage.expectOnPage()
  })
})
