import { expect, type Locator, type Page } from "@playwright/test"

export class WelcomePage {
  constructor(private readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByRole("heading", { name: "Bem-vindo ao Portal Estapar B2B" })
  }

  get garagesCard(): Locator {
    return this.page.getByTestId("welcome-card-garages")
  }

  get mensalistasCard(): Locator {
    return this.page.getByTestId("welcome-card-mensalistas")
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$/, { timeout: 30000 })
    await expect(this.heading).toBeVisible({ timeout: 30000 })
  }

  async goToGaragesFromCard(): Promise<void> {
    await this.garagesCard.click()
    await expect(this.page).toHaveURL(/\/garagens$/)
  }
}
