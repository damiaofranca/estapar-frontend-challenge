import type { SVGProps } from "react";

import { cn } from "@/lib/cn";

export const MensalistasIcon = ({
	className,
	...props
}: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="1em"
		height="1em"
		viewBox="0 0 24 15"
		fill="none"
		className={cn("overflow-visible", className)}
		{...props}
	>
		<path
			stroke="#7AD33E"
			strokeLinecap="round"
			strokeWidth={2}
			d="M3.46 11.93h-.922A1.538 1.538 0 0 1 1 10.39V5.778a3 3 0 0 1 .402-1.5L2.428 2.5A3 3 0 0 1 5.027 1h6.795a3 3 0 0 1 2.121.879l1.7 1.699a3 3 0 0 0 1.344.776l4.091 1.096A2.593 2.593 0 0 1 23 7.955v2.617a1.358 1.358 0 0 1-1.357 1.357H20.35m-5.795 0h-5.3"
		/>
		<path
			stroke="#7AD33E"
			strokeWidth={2}
			d="M6.44 9.617a2.147 2.147 0 1 1 0 4.294 2.147 2.147 0 0 1 0-4.294ZM17.37 9.617a2.147 2.147 0 1 1 0 4.294 2.147 2.147 0 0 1 0-4.294Z"
		/>
	</svg>
);
