export interface Plan {
	id: string;
	garageId: string;
	description: string;
	startValidity: string;
	endValidity: string;
	priceInCents: string;
	active: string;
	descriptionAvailable: string;
	// API: typo "Cacellation"
	amountDailyCacellationInCents: string;
	// API: typo "veichle"
	veichleType: string;
	totalVacancies: number;
}

export type CreatePlanPayload = Omit<Plan, "id">;

export interface GetPlansParams {
	garageId?: string;
}
