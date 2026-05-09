import { addDays, format, isValid, parseISO } from "date-fns"

export const ISO_DATE_FORMAT = "yyyy-MM-dd"

export const todayIsoDate = (): string => format(new Date(), ISO_DATE_FORMAT)

export const addDaysIso = (isoDate: string, days: number): string => {
	const parsed = parseISO(isoDate.slice(0, 10))
	if (!isValid(parsed)) {
		return format(addDays(new Date(), days), ISO_DATE_FORMAT)
	}
	return format(addDays(parsed, days), ISO_DATE_FORMAT)
}

export const toIsoDate = (value: string | null | undefined): string => {
	if (!value) {
		return ""
	}
	const parsed = parseISO(value.slice(0, 10))
	if (!isValid(parsed)) {
		return ""
	}
	return format(parsed, ISO_DATE_FORMAT)
}
