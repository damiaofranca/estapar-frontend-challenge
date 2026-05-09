import type { SVGProps } from "react"

export const MoneyIcon = (props: SVGProps<SVGSVGElement>) => (
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
		<path
			d="M10 5.5v9M12.25 7.75H8.875a1.375 1.375 0 0 0 0 2.75h2.25a1.375 1.375 0 0 1 0 2.75H7.5"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)
