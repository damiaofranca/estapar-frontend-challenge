import type { ComponentPropsWithoutRef, ReactElement } from "react"

import { cn } from "@/lib/cn"

export type BadgeVariant = "neutral" | "success" | "danger" | "info"

const badgeBaseClassName =
	"inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium"

const badgeVariantClassName: Record<BadgeVariant, string> = {
	neutral: "bg-estapar-muted-surface-alt text-estapar-muted border border-estapar-border-light",
	success: "bg-estapar-primary/10 text-estapar-primary-hover border border-estapar-border-light",
	danger: "bg-estapar-error/10 text-estapar-error border border-estapar-border-light",
	info: "bg-estapar-muted-surface text-estapar-body border border-estapar-border-light",
}

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
	variant?: BadgeVariant
}

export const Badge = ({ className, variant = "neutral", ...rest }: BadgeProps): ReactElement => (
	<span className={cn(badgeBaseClassName, badgeVariantClassName[variant], className)} {...rest} />
)
