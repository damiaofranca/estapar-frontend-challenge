import type { SVGProps } from "react"

export const XIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 20 20"
		fill="none"
		aria-hidden
		{...props}
	>
		<path
			d="M5 5l10 10M15 5 5 15"
			stroke="currentColor"
			strokeWidth={1.8}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)
