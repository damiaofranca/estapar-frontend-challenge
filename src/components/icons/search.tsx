import type { SVGProps } from "react"

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m17 17-3.5-3.5M9 15a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
