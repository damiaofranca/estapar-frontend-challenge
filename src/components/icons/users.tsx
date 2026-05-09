import type { SVGProps } from "react"

export const UsersIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14 17v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3V17M8.5 9.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 17v-1.5a3 3 0 0 0-2.25-2.9M13 3.6a3 3 0 0 1 0 5.8"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
