import { expect, type Locator, type Page } from "@playwright/test"

export class PlanFormModalPage {
  constructor(private readonly page: Page) {}

  get dialog(): Locator {
    return this.page.getByTestId("plan-form-modal")
  }

  get descriptionInput(): Locator {
    return this.page.getByLabel("Descrição")
  }

  get totalVacanciesInput(): Locator {
    return this.page.getByLabel("Total de Vagas")
  }

  get priceInput(): Locator {
    return this.page.getByLabel("Valor (R$)")
  }

  get cancellationPriceInput(): Locator {
    return this.page.getByLabel("Valor do Cancelamento (R$)")
  }

  get startValidityInput(): Locator {
    return this.page.getByLabel("Início da Validade")
  }

  get endValidityInput(): Locator {
    return this.page.getByLabel("Fim da Validade")
  }

  get vehicleTypeSelect(): Locator {
    return this.page.getByLabel("Tipo de Veículo")
  }

  get submitButton(): Locator {
    return this.page.getByRole("button", { name: "Criar" })
  }

  get cancelButton(): Locator {
    return this.page.getByRole("button", { name: "Cancelar" })
  }

  async expectOpen(): Promise<void> {
    await expect(this.dialog).toBeVisible()
    await expect(this.page.getByRole("heading", { name: "Novo Plano" })).toBeVisible()
  }

  async fillValidPlan(): Promise<void> {
    await this.descriptionInput.fill("Plano E2E")
    await this.vehicleTypeSelect.selectOption("1")
    await this.totalVacanciesInput.fill("5")
    await this.priceInput.fill("5000")
    await this.cancellationPriceInput.fill("1000")
  }

  async submitCreate(): Promise<void> {
    await this.submitButton.click()
  }
}
