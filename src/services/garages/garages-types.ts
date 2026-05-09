export interface GarageItem {
	code: string
	name: string
	address: string
	city: string
	state: string
	region: string
	subsidiary: string
}

export interface GaragePaginatedList {
	pageSize: number
	data: GarageItem[]
	hasNextPage: number
	currentPage: number
	countRecords: number
	hasPreviousPage: number
}

export interface GetGaragesParams {
	currentPage: number
	pageSize: number
	garageName?: string
}

export interface Garage {
	code: string
	name: string
	city: string
	state: string
	region: string
	address: string
	subsidiary: string
	countSpaces: number
	occupiedSpaces: number
	maxDiscountPercent: number
}

export interface GetGarageParams {
	garageId: string
}
