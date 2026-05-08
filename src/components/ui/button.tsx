import {
	forwardRef,
	type ComponentPropsWithoutRef,
	type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const buttonBaseClassName =
	"inline-flex items-center justify-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const buttonVariantClassName: Record<ButtonVariant, string> = {
	primary:
		"bg-estapar-primary text-estapar-surface shadow-sm hover:bg-estapar-primary-hover focus-visible:ring-offset-estapar-surface",
	secondary:
		"border border-estapar-border bg-estapar-muted-surface text-estapar-body hover:bg-estapar-muted-surface-alt focus-visible:ring-offset-estapar-surface",
	outline:
		"border border-estapar-border bg-estapar-surface text-estapar-label shadow-sm hover:bg-estapar-muted-surface focus-visible:ring-offset-estapar-surface",
	ghost:
		"text-estapar-body hover:bg-estapar-muted-surface focus-visible:ring-offset-estapar-canvas",
};

const buttonSizeClassName: Record<ButtonSize, string> = {
	sm: "h-9 min-h-9 rounded-md px-3 text-xs",
	md: "h-10 min-h-10 rounded-md px-4 text-sm",
	lg: "h-11 min-h-11 rounded-lg px-4 text-sm",
};

const buttonIconSlotClassName: Record<ButtonSize, string> = {
	sm: "inline-flex shrink-0 items-center justify-center [&_svg]:size-3.5",
	md: "inline-flex shrink-0 items-center justify-center [&_svg]:size-4",
	lg: "inline-flex shrink-0 items-center justify-center [&_svg]:size-4",
};

type ButtonSpinnerProps = {
	size: ButtonSize;
};

const ButtonSpinner = ({ size }: ButtonSpinnerProps) => (
	<span
		className={cn(
			buttonIconSlotClassName[size],
			"animate-spin motion-reduce:animate-none",
		)}
		aria-hidden
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			className="size-[1em] shrink-0"
			aria-hidden
		>
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"
			/>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	</span>
);

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
	size?: ButtonSize;
	loading?: boolean;
	endIcon?: ReactNode;
	startIcon?: ReactNode;
	variant?: ButtonVariant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			endIcon,
			children,
			disabled,
			className,
			startIcon,
			size = "lg",
			loading = false,
			type = "button",
			variant = "primary",
			...rest
		},
		ref,
	) => {
		const isDisabled = Boolean(disabled || loading);

		return (
			<button
				ref={ref}
				type={type}
				disabled={isDisabled}
				aria-busy={loading ? true : undefined}
				className={cn(
					buttonBaseClassName,
					buttonVariantClassName[variant],
					buttonSizeClassName[size],
					loading && "cursor-wait",
					className,
				)}
				{...rest}
			>
				{loading ? <ButtonSpinner size={size} /> : null}
				{!loading && Boolean(startIcon) ? (
					<span className={buttonIconSlotClassName[size]} aria-hidden>
						{startIcon}
					</span>
				) : null}
				{children}
				{!loading && Boolean(endIcon) ? (
					<span className={buttonIconSlotClassName[size]} aria-hidden>
						{endIcon}
					</span>
				) : null}
			</button>
		);
	},
);

Button.displayName = "Button";
