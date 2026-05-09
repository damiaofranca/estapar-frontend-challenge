import type { SVGProps } from "react"

export const EditIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9 3.5H4.5A1.5 1.5 0 0 0 3 5v10.5A1.5 1.5 0 0 0 4.5 17H15a1.5 1.5 0 0 0 1.5-1.5V11M14.5 2.5l3 3-7.5 7.5H7v-3l7.5-7.5Z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
