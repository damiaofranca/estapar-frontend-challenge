import { formatCentsToBRL } from "@/lib/format"
import type { Plan } from "@/services/plans/plans-types"

export type PlanRow = Plan & {
	availableVacancies: number
	occupiedForDisplay: number
}

export const buildPlanRows = (plans: Plan[]): PlanRow[] =>
	plans.map((plan) => {
		const total = plan.totalVacancies ?? 0
		const occupied = plan.occupiedVacancies ?? 0

		return {
			...plan,
			occupiedForDisplay: occupied,
			availableVacancies: Math.max(0, total - occupied),
			VeichleType: plan.VeichleType || plan.veichleType,
		}
	})

export const formatPlanValue = (row: PlanRow): string => {
	if (row.priceInCents == null || row.priceInCents === "") {
		return "—"
	}
	return formatCentsToBRL(row.priceInCents)
}
