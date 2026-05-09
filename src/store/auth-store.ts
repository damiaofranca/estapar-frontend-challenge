import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { STORAGE_KEYS } from "@/config/constants"

interface AuthState {
	token: string | null
	setToken: (token: string) => void
	clearToken: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => set({ token }),
			clearToken: () => set({ token: null }),
		}),
		{
			name: STORAGE_KEYS.AUTH,
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ token: state.token }),
		},
	),
)

export const getAuthToken = (): string | null => useAuthStore.getState().token

export const clearAuthToken = (): void => useAuthStore.getState().clearToken()

export const setAuthToken = (token: string): void => useAuthStore.getState().setToken(token)
