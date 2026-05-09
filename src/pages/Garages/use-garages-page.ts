import { useCallback, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { PAGINATION_DEFAULTS, QUERY_PARAMS } from "@/config/constants"
import type { GarageItem } from "@/services/garages/garages-types"
import { useDebounce, useGetGaragesQuery } from "@/hooks"

export type GaragesRow = GarageItem & {
	cityUf: string
}

const DEFAULT_PAGE_SIZE = PAGINATION_DEFAULTS.PAGE_SIZE

const getCityUf = (garage: GarageItem): string => `${garage.city}/${garage.state}`

export const useGaragesPage = () => {
	const [pageIndex, setPageIndex] = useState(0)
	const [garageName, setGarageName] = useState("")
	const [mensalistaDigital, setMensalistaDigital] = useState(true)
	const [searchParams, setSearchParams] = useSearchParams()

	const selectedGarageId = searchParams.get(QUERY_PARAMS.GARAGE_ID)

	const debouncedGarageName = useDebounce(garageName.trim(), 500)

	const filters = useMemo(
		() => ({
			pageSize: DEFAULT_PAGE_SIZE,
			currentPage: pageIndex + 1,
			garageName: debouncedGarageName.length > 0 ? debouncedGarageName : undefined,
		}),
		[pageIndex, debouncedGarageName],
	)

	const garagesQuery = useGetGaragesQuery(filters)

	const totalCount = garagesQuery.data?.countRecords ?? 0

	const rows = useMemo<GaragesRow[]>(() => {
		const garages = garagesQuery.data?.data ?? []
		return garages.map((g) => ({
			...g,
			cityUf: getCityUf(g),
		}))
	}, [garagesQuery.data])

	const handleGarageNameChange = (value: string): void => {
		setPageIndex(0)
		setGarageName(value)
	}

	const handleMensalistaDigitalChange = (checked: boolean): void => {
		setMensalistaDigital(checked)
	}

	const handleViewGarage = useCallback(
		(garageCode: string): void => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev)
					next.set(QUERY_PARAMS.GARAGE_ID, garageCode)
					return next
				},
				{ replace: false },
			)
		},
		[setSearchParams],
	)

	const handleCloseDetails = useCallback((): void => {
		setSearchParams(
			(prev) => {
				const next = new URLSearchParams(prev)
				next.delete(QUERY_PARAMS.GARAGE_ID)
				return next
			},
			{ replace: false },
		)
	}, [setSearchParams])

	return {
		rows,
		pageIndex,
		garageName,
		totalCount,
		garagesQuery,
		mensalistaDigital,
		selectedGarageId,
		pageSize: DEFAULT_PAGE_SIZE,

		onPageChange: setPageIndex,
		onViewGarage: handleViewGarage,
		onCloseDetails: handleCloseDetails,
		isDetailsOpen: selectedGarageId != null,
		onGarageNameChange: handleGarageNameChange,
		onMensalistaDigitalChange: handleMensalistaDigitalChange,
	}
}
