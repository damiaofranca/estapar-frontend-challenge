import { forwardRef, type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/cn"

export const labelRootClassName =
  "flex items-center gap-2 text-sm leading-none font-semibold text-estapar-label select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"

export type LabelProps = ComponentPropsWithoutRef<"label">

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn(labelRootClassName, className)} {...props} />
))

Label.displayName = "Label"
