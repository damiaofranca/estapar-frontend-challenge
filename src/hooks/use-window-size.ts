import { useEffect, useState } from "react"

export type WindowSize = {
	width: number | null
	height: number | null
}

const getWindowSize = (): WindowSize => {
	if (typeof window === "undefined") {
		return { width: null, height: null }
	}

	return { width: window.innerWidth, height: window.innerHeight }
}

export const useWindowSize = (): WindowSize => {
	const [windowSize, setWindowSize] = useState<WindowSize>(() => getWindowSize())

	useEffect(() => {
		if (typeof window === "undefined") {
			return
		}

		let rafId: number | null = null

		const handleResize = (): void => {
			if (rafId) {
				window.cancelAnimationFrame(rafId)
			}

			rafId = window.requestAnimationFrame(() => {
				setWindowSize(getWindowSize())
			})
		}

		window.addEventListener("resize", handleResize, { passive: true })
		handleResize()

		return () => {
			if (rafId) {
				window.cancelAnimationFrame(rafId)
			}

			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return windowSize
}

