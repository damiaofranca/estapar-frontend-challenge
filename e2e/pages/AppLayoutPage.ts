import { expect, type Locator, type Page } from "@playwright/test"

export class AppLayoutPage {
  constructor(private readonly page: Page) {}

  get sidebar(): Locator {
    return this.page.locator("aside").first()
  }

  get navGarages(): Locator {
    return this.page.getByTestId("nav-garages")
  }

  get navMensalistas(): Locator {
    return this.page.getByTestId("nav-mensalistas")
  }

  get logoutButton(): Locator {
    return this.page.getByRole("button", { name: "Sair" })
  }

  async goToGaragens(): Promise<void> {
    await this.navGarages.click()
    await expect(this.page).toHaveURL(/\/garagens$/)
  }

  async goToMensalistas(): Promise<void> {
    await this.navMensalistas.click()
    await expect(this.page).toHaveURL(/\/mensalistas$/)
  }

  async logout(): Promise<void> {
    await this.logoutButton.click()
    await expect(this.page).toHaveURL(/\/login$/)
  }

  async expectSidebarCollapsedMobile(): Promise<void> {
    await expect(this.sidebar).toHaveClass(/w-16/)
  }
}
