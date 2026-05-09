import type { SVGProps } from "react"

export const ChevronRightIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={13} height={14} fill="none" {...props}>
		<path
			stroke="#D2D5DB"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M1 6.872h11M6.74 13 12 6.872 6.74 1"
		/>
	</svg>
)
