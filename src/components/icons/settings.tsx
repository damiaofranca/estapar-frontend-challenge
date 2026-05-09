import type { SVGProps } from "react"

export const SettingsIcon = (props: SVGProps<SVGSVGElement>) => (
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
			d="M10 12.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16.05 12.75a1.5 1.5 0 0 0 .3 1.65l.06.06a1.82 1.82 0 1 1-2.58 2.58l-.06-.06a1.5 1.5 0 0 0-1.65-.3 1.5 1.5 0 0 0-.91 1.37V18a1.82 1.82 0 1 1-3.64 0v-.09a1.5 1.5 0 0 0-.98-1.37 1.5 1.5 0 0 0-1.65.3l-.06.06A1.82 1.82 0 1 1 2.3 14.32l.06-.06a1.5 1.5 0 0 0 .3-1.65 1.5 1.5 0 0 0-1.37-.91H1A1.82 1.82 0 1 1 1 8.06h.09a1.5 1.5 0 0 0 1.37-.98 1.5 1.5 0 0 0-.3-1.65l-.06-.06A1.82 1.82 0 1 1 4.68 2.79l.06.06a1.5 1.5 0 0 0 1.65.3h.06a1.5 1.5 0 0 0 .91-1.37V1.7a1.82 1.82 0 1 1 3.64 0v.09a1.5 1.5 0 0 0 .91 1.37 1.5 1.5 0 0 0 1.65-.3l.06-.06a1.82 1.82 0 1 1 2.58 2.58l-.06.06a1.5 1.5 0 0 0-.3 1.65v.06a1.5 1.5 0 0 0 1.37.91H19a1.82 1.82 0 1 1 0 3.64h-.09a1.5 1.5 0 0 0-1.37.91Z"
			stroke="currentColor"
			strokeWidth={1.4}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
)
