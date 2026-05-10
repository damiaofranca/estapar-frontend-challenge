import { performLoginWithMocks } from "./fixtures/auth-helpers"
import { expect, test } from "./fixtures/test"
import { AppLayoutPage } from "./pages/AppLayoutPage"
import { GaragesPage } from "./pages/GaragesPage"

test.describe("Layout responsivo", () => {
  test("sidebar compacta em viewport mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await performLoginWithMocks(page)

    const layout = new AppLayoutPage(page)
    await layout.expectSidebarCollapsedMobile()

    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()
    await expect(garagesPage.heading).toBeVisible()
  })
})
