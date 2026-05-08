import type { SVGProps } from "react";

export const ChevronIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={7}
		height={12}
		fill="none"
		{...props}
	>
		<path
			fill="#09090B"
			d="M6.053 6.053a.75.75 0 0 0 0-1.06L1.28.22A.75.75 0 0 0 .22 1.28l4.242 4.243L.22 9.766a.75.75 0 0 0 1.06 1.06l4.773-4.773Zm-1.53-.53v.75h1v-1.5h-1v.75Z"
		/>
	</svg>
);
