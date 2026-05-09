import { useEffect, useState } from "react"

import { useAuthStore } from "@/store/auth-store"

export const useAuthStoreHydration = (): boolean => {
	const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated())

	useEffect(() => {
		return useAuthStore.persist.onFinishHydration(() => {
			setHydrated(true)
		})
	}, [])

	return hydrated
}
