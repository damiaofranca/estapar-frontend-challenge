import { performLoginWithMocks } from "./fixtures/auth-helpers"
import { expect, test } from "./fixtures/test"
import { GaragesPage } from "./pages/GaragesPage"
import { PlanFormModalPage } from "./pages/PlanFormModalPage"

test.describe("Formulário de plano", () => {
  test.beforeEach(async ({ page }) => {
    await performLoginWithMocks(page)
  })

  test("validação exige campos obrigatórios ao criar", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()
    await garagesPage.openGarageDetails("G1")
    await expect(page.getByText("Carregando detalhes da garagem...")).toBeHidden()

    await garagesPage.newPlanButton.click()

    const planModal = new PlanFormModalPage(page)
    await planModal.expectOpen()
    await planModal.descriptionInput.fill("")
    await planModal.totalVacanciesInput.fill("")
    await planModal.submitButton.click()

    await expect(page.getByText("Informe a descrição do plano")).toBeVisible()
    await expect(page.getByText("Informe o total de vagas")).toBeVisible()
  })

  test("validação de datas quando fim é anterior ao início", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()
    await garagesPage.openGarageDetails("G1")
    await expect(page.getByText("Carregando detalhes da garagem...")).toBeHidden()

    await garagesPage.newPlanButton.click()

    const planModal = new PlanFormModalPage(page)
    await planModal.expectOpen()

    await planModal.descriptionInput.fill("Plano datas inválidas")
    await planModal.vehicleTypeSelect.selectOption("1")
    await planModal.totalVacanciesInput.fill("2")
    await planModal.priceInput.fill("5000")
    await planModal.cancellationPriceInput.fill("1000")

    await planModal.startValidityInput.fill("2099-01-01")
    await planModal.endValidityInput.fill("2020-01-01")

    await planModal.submitButton.click()
    await expect(page.getByText("Fim da validade deve ser maior ou igual ao início")).toBeVisible()
  })

  test("descrição acima do limite exibe erro de tamanho", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()
    await garagesPage.openGarageDetails("G1")
    await expect(page.getByText("Carregando detalhes da garagem...")).toBeHidden()

    await garagesPage.newPlanButton.click()

    const planModal = new PlanFormModalPage(page)
    await planModal.expectOpen()

    const longText = "a".repeat(121)
    await planModal.descriptionInput.fill(longText)
    await planModal.submitButton.click()

    await expect(page.getByText("Descrição muito longa")).toBeVisible()
  })

  test("fluxo feliz cria plano com sucesso", async ({ page }) => {
    const garagesPage = new GaragesPage(page)
    await garagesPage.goto()
    await garagesPage.openGarageDetails("G1")
    await expect(page.getByText("Carregando detalhes da garagem...")).toBeHidden()

    await garagesPage.newPlanButton.click()

    const planModal = new PlanFormModalPage(page)
    await planModal.expectOpen()
    await planModal.fillValidPlan()

    const createResponse = page.waitForResponse((response) => {
      try {
        const url = new URL(response.url())
        return url.pathname === "/plan" && response.request().method() === "POST"
      } catch {
        return false
      }
    })

    await planModal.submitCreate()
    await createResponse

    await expect(page.getByText("Plano criado com sucesso")).toBeVisible()
    await expect(planModal.dialog).toBeHidden()
  })
})
