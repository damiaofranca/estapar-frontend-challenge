export interface Plan {
	idPlan: number
	idGarage: number
	description: string
	VeichleType: number
	startValidity: string
	totalVacancies: number
	active: boolean | string
	endValidity: string | null
	occupiedVacancies?: number
	descriptionAvailable: string
	priceInCents: number | string
	amountDailyCancellationInCents: number
}

export type CreatePlanPayload = Omit<Plan, "idPlan">

export interface GetPlansParams {
	garageId?: string
}
