export interface LoginCredentials {
	username: string
	password: string
}

export interface AuthToken {
	token: string
	expiredIn: string
}

export interface DecodedAuthToken {
	exp?: number
	sub?: string
	name?: string
	username?: string
}
