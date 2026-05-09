const brlCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
})

const integerFormatter = new Intl.NumberFormat("pt-BR")

const toFiniteNumber = (input: number | string | null | undefined): number => {
	if (input == null) {
		return 0
	}
	const value = typeof input === "string" ? Number(input) : input
	return Number.isFinite(value) ? value : 0
}

export const formatCentsToBRL = (
	cents: number | string | null | undefined,
): string => brlCurrencyFormatter.format(toFiniteNumber(cents) / 100)

export const formatInteger = (
	value: number | string | null | undefined,
): string => integerFormatter.format(Math.trunc(toFiniteNumber(value)))

const truthyStringValues = new Set(["1", "true", "ativo", "active", "yes", "sim"])

export const isActiveFlag = (value: string | number | boolean | null | undefined): boolean => {
	if (typeof value === "boolean") {
		return value
	}
	if (typeof value === "number") {
		return value > 0
	}
	if (typeof value === "string") {
		return truthyStringValues.has(value.trim().toLowerCase())
	}
	return false
}
