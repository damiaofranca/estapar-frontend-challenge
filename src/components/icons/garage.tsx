import type { SVGProps } from "react"

import { cn } from "@/lib/cn"

export const GaragesIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 21 21"
		fill="none"
		className={cn("overflow-visible", className)}
		{...props}
	>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeWidth={2}
			d="M4.857 20h11.286M4.857 20H4a3 3 0 0 1-3-3v-3.572a3 3 0 0 1 3-3h.857m0 9.572v-9.572m0 0V4a3 3 0 0 1 3-3h5.045a3 3 0 0 1 3 2.955l.053 3.572L16.143 20m0 0H17a3 3 0 0 0 3-3v-6.473a3 3 0 0 0-3-3h-1.045m-7.67-2.901h4.286M8.286 8.542h4.285m-4.285 3.771h4.285m-4.285 3.916h4.285"
		/>
	</svg>
)
