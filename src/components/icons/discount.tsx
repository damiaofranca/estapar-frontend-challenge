import type { SVGProps } from "react"

export const DiscountIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 20 20"
		fill="none"
		aria-hidden
		{...props}
	>
		<circle cx={10} cy={10} r={7.5} stroke="currentColor" strokeWidth={1.6} />
		<path d="m13 7-6 6" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
		<circle cx={7.75} cy={7.75} r={1.1} stroke="currentColor" strokeWidth={1.4} />
		<circle cx={12.25} cy={12.25} r={1.1} stroke="currentColor" strokeWidth={1.4} />
	</svg>
)
