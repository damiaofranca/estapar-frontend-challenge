import type { SVGProps } from "react"

export const MapPinIcon = (props: SVGProps<SVGSVGElement>) => (
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
			d="M10 18s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<circle cx={10} cy={8} r={2.25} stroke="currentColor" strokeWidth={1.6} />
	</svg>
)
