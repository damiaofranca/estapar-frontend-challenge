export const STORAGE_KEYS = {
	TOKEN: "@estapar:token",
	USER: "@estapar:user",
};

export const ROUTES = {
	LOGIN: "/login",
	HOME: "/",
	GARAGES: "/garagens",
	GARAGE_DETAIL: (id: string): string => `/garagens/${id}`,
};

export const PAGINATION_DEFAULTS = {
	PAGE: 1,
	PAGE_SIZE: 10,
};

export const QUERY_STALE_TIME = {
	SHORT: 1000 * 60,
	DEFAULT: 1000 * 60 * 5,
	LONG: 1000 * 60 * 30,
};
