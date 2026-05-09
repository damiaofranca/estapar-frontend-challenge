export type InputMask = {
	format: (rawValue: string) => string
}

const onlyDigits = (value: string): string => value.replace(/\D/g, "")

const brlCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL",
	minimumFractionDigits: 2,
})

export const moneyMask: InputMask = {
	format: (rawValue) => {
		const digits = onlyDigits(rawValue)
		if (!digits) {
			return ""
		}
		const cents = Number(digits)
		if (!Number.isFinite(cents)) {
			return ""
		}
		return brlCurrencyFormatter.format(cents / 100)
	},
}

export const moneyMaskToCents = (formatted: string): number => {
	const digits = onlyDigits(formatted)
	if (!digits) {
		return 0
	}
	const cents = Number(digits)
	return Number.isFinite(cents) ? cents : 0
}

export const formatCentsToMoneyMask = (
	cents: number | string | null | undefined,
): string => {
	if (cents == null || cents === "") {
		return moneyMask.format("0")
	}
	const numeric = typeof cents === "string" ? Number(cents) : cents
	if (!Number.isFinite(numeric)) {
		return moneyMask.format("0")
	}
	return moneyMask.format(String(Math.trunc(Math.abs(numeric))))
}

const applyDigitMask = (digits: string, pattern: string): string => {
	let result = ""
	let digitIndex = 0

	for (const char of pattern) {
		if (digitIndex >= digits.length) {
			break
		}
		if (char === "#") {
			result += digits[digitIndex]
			digitIndex += 1
		} else {
			result += char
		}
	}

	return result
}

const buildPatternMask = (
	patterns: string[],
	maxDigits: number,
): InputMask => ({
	format: (rawValue) => {
		const digits = onlyDigits(rawValue).slice(0, maxDigits)
		if (!digits) {
			return ""
		}
		const pattern =
			patterns.find((p) => p.replace(/[^#]/g, "").length >= digits.length) ??
			patterns[patterns.length - 1]
		return applyDigitMask(digits, pattern)
	},
})


export const cepMask: InputMask = buildPatternMask(["#####-###"], 8)

export const cpfMask: InputMask = buildPatternMask(["###.###.###-##"], 11)

export const cnpjMask: InputMask = buildPatternMask(
	["##.###.###/####-##"],
	14,
)


export const Mask = {
	cepMask,
	cpfMask,
	cnpjMask,
	moneyMask,
	moneyMaskToCents,
	formatCentsToMoneyMask,
}