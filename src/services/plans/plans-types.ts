export interface Plan {
	id: string;
	active: string;
	garageId: string;
	description: string;
	endValidity: string;
	priceInCents: string;
	startValidity: string;
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
