import { expect, type Locator, type Page } from "@playwright/test"

export class GaragesPage {
  constructor(private readonly page: Page) {}

  get root(): Locator {
    return this.page.getByTestId("garages-page")
  }

  get heading(): Locator {
    return this.page.getByRole("heading", { name: "Garagens" })
  }

  get mensalistaDigitalSwitch(): Locator {
    return this.page.getByRole("switch", { name: "Mensalista Digital" })
  }

  get searchInput(): Locator {
    return this.page.getByTestId("garages-search-input")
  }

  get paginationNav(): Locator {
    return this.page.getByRole("navigation", { name: "Paginação" })
  }

  viewDetailsButtonForCode(code: string): Locator {
    return this.page.getByTestId(`garage-view-button-${code}`)
  }

  get drawerCloseButton(): Locator {
    return this.page.getByTestId("drawer-close-button")
  }

  get newPlanButton(): Locator {
    return this.page.getByTestId("plan-form-open-create")
  }

  async goto(): Promise<void> {
    await this.page.getByTestId("nav-garages").click()
    await expect(this.page).toHaveURL(/\/garagens$/, { timeout: 15000 })
    await expect(this.root).toBeVisible({ timeout: 15000 })
  }

  async expectTableShowsGarageName(name: string): Promise<void> {
    await expect(this.page.getByRole("cell", { name, exact: true })).toBeVisible()
  }

  async openGarageDetails(code: string): Promise<void> {
    await this.viewDetailsButtonForCode(code).click()
    await expect(this.drawerCloseButton).toBeVisible()
  }

  async closeDrawer(): Promise<void> {
    await this.drawerCloseButton.click()
    await expect(this.drawerCloseButton).toBeHidden()
  }

  async goToNextPage(): Promise<void> {
    await this.paginationNav.getByRole("button", { name: "Próxima página" }).click()
  }

  async expectPaginationVisible(): Promise<void> {
    await expect(this.paginationNav).toBeVisible()
  }
}
