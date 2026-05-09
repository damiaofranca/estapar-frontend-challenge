import type { SVGProps } from "react"

export const ChevronLeftSmallIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox="0 0 16 16"
		fill="none"
		stroke="currentColor"
		strokeWidth={2}
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden
		{...props}
	>
		<path d="M10 12 6 8l4-4" />
	</svg>
)

