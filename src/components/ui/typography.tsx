import { createElement, forwardRef, type HTMLAttributes, type ReactNode } from "react"

import { cn } from "@/lib/cn"

import type { TypographyAs } from "./typography-types"

export type TypographyProps = {
  as?: TypographyAs
  children?: ReactNode
} & HTMLAttributes<HTMLElement>

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ as = "p", className, children, ...rest }, ref) => {
    return createElement(as, { ref, className: cn(className), ...rest }, children)
  },
)

Typography.displayName = "Typography"
