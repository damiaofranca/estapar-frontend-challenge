export const VehicleType = {
	CAR: 1,
	MOTORCYCLE: 2,
} as const

export type VehicleTypeValue = (typeof VehicleType)[keyof typeof VehicleType]

export interface Plan {
	idPlan: number
	idGarage: number
	description: string
	VeichleType: number
	veichleType: number
	startValidity: string
	totalVacancies: number
	active: boolean | string
	endValidity: string | null
	occupiedVacancies?: number
	descriptionAvailable: string
	priceInCents: number | string
	amountDailyCancellationInCents: number
}

export interface CreatePlanPayload {
	id?: string
	active: string
	garageId: string
	description: string
	endValidity: string
	veichleType: string
	priceInCents: string
	startValidity: string
	totalVacancies: number
	descriptionAvailable: string
	amountDailyCacellationInCents: string
}

export interface UpdatePlanPayload extends Omit<CreatePlanPayload, "id"> {
	id: string
}

export interface GetPlansParams {
	garageId?: string
}
