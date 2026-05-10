import { expect, type Locator, type Page } from "@playwright/test"

export class MensalistasPage {
  constructor(private readonly page: Page) {}

  get heading(): Locator {
    return this.page.getByRole("heading", { name: "Mensalistas" })
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible()
    await expect(this.page.getByText("Esta página está em desenvolvimento")).toBeVisible()
  }
}
