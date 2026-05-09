import type { SVGProps } from "react"

export const BranchIcon = (props: SVGProps<SVGSVGElement>) => (
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
			d="M3 17.5h14M4.5 17.5V5.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v12M7 8h2M7 11h2M7 14h2M11 8h2M11 11h2M11 14h2"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)
