import { expect, type Locator, type Page } from "@playwright/test"

export class LoginPage {
  constructor(private readonly page: Page) {}

  get root(): Locator {
    return this.page.getByTestId("login-page")
  }

  get usernameInput(): Locator {
    return this.page.getByTestId("login-username")
  }

  get passwordInput(): Locator {
    return this.page.getByTestId("login-password")
  }

  get submitButton(): Locator {
    return this.page.getByTestId("login-submit")
  }

  async goto(): Promise<void> {
    await this.page.goto("/login", { waitUntil: "domcontentloaded" })
    await expect(this.root).toBeVisible({ timeout: 20000 })
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
  }

  async submit(): Promise<void> {
    await this.submitButton.click()
  }

  async expectOnPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login$/, { timeout: 15000 })
    await expect(this.root).toBeVisible({ timeout: 15000 })
  }
}
