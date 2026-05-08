import {
	forwardRef,
	useId,
	type ComponentPropsWithoutRef,
	type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

import { Label, type LabelProps } from "./label";

export const inputRootClassName =
	"peer flex h-10 w-full min-w-0 rounded-md border border-estapar-border-input bg-estapar-surface px-3 py-2 text-sm leading-none text-estapar-body shadow-sm outline-none transition-[color,box-shadow] placeholder:text-estapar-subtle focus-visible:border-estapar-primary focus-visible:ring-[3px] focus-visible:ring-estapar-ring/35 disabled:cursor-not-allowed disabled:opacity-50";

const fieldRootClassName =
	"flex flex-col gap-2 has-[[data-slot=input]:disabled]:[&_label]:pointer-events-none has-[[data-slot=input]:disabled]:[&_label]:cursor-not-allowed has-[[data-slot=input]:disabled]:[&_label]:opacity-50";

const iconSlotClassName =
	"pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-estapar-subtle [&_svg]:block";

type InputOwnProps = {
	label?: ReactNode;
	labelProps?: Omit<LabelProps, "htmlFor" | "children">;
	error?: ReactNode;
	hint?: ReactNode;
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	rootClassName?: string;
};

export type InputProps = ComponentPropsWithoutRef<"input"> & InputOwnProps;

const isComposedInput = (props: InputOwnProps): boolean =>
	Boolean(
		props.label != null ||
		props.error != null ||
		props.hint != null ||
		props.startIcon != null ||
		props.endIcon != null,
	);

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			hint,
			error,
			label,
			endIcon,
			startIcon,
			className,
			labelProps,
			id: idProp,
			rootClassName,
			type = "text",
			"aria-invalid": ariaInvalidProp,
			"aria-describedby": ariaDescribedByProp,
			...rest
		},
		ref,
	) => {
		const reactId = useId();
		const inputId =
			idProp ??
			(isComposedInput({ label, error, hint, startIcon, endIcon })
				? reactId
				: undefined);
		const errorId = `${reactId}-error`;
		const hintId = `${reactId}-hint`;

		const composed = isComposedInput({
			label,
			error,
			hint,
			startIcon,
			endIcon,
		});

		const describedByParts = [
			ariaDescribedByProp,
			composed && error != null && error !== false ? errorId : undefined,
			composed && hint != null ? hintId : undefined,
		].filter((v): v is string => typeof v === "string" && v.length > 0);
		const ariaDescribedBy =
			describedByParts.length > 0 ? describedByParts.join(" ") : undefined;

		const ariaInvalid =
			ariaInvalidProp ?? (error != null && error !== false ? true : undefined);

		const inputClassName = cn(
			inputRootClassName,
			Boolean(startIcon) ? "pl-10" : undefined,
			Boolean(endIcon) ? "pr-10" : undefined,
			className,
		);

		const inputEl = (
			<input
				ref={ref}
				type={type}
				data-slot="input"
				className={inputClassName}
				aria-invalid={ariaInvalid}
				id={composed ? inputId : idProp}
				aria-describedby={ariaDescribedBy}
				{...rest}
			/>
		);

		if (!composed) {
			return inputEl;
		}

		const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

		return (
			<div className={cn(fieldRootClassName, rootClassName)}>
				{label != null ? (
					<Label htmlFor={inputId} className={cn(labelClassName)} {...restLabelProps}>
						{label}
					</Label>
				) : null}

				<div className="relative shrink-0">
					{startIcon ? (
						<span className={cn(iconSlotClassName, "left-3")} aria-hidden>
							{startIcon}
						</span>
					) : null}
					{endIcon ? (
						<span className={cn(iconSlotClassName, "right-3")} aria-hidden>
							{endIcon}
						</span>
					) : null}
					{inputEl}
				</div>

				{error != null && error !== false ? (
					typeof error === "string" ? (
						<p
							id={errorId}
							role="alert"
							className="text-sm font-medium text-estapar-error"
						>
							{error}
						</p>
					) : (
						<div
							id={errorId}
							role="alert"
							className="text-sm font-medium text-estapar-error"
						>
							{error}
						</div>
					)
				) : null}

				{hint != null ? (
					<p id={hintId} className="text-sm text-estapar-muted">
						{hint}
					</p>
				) : null}
			</div>
		);
	},
);

Input.displayName = "Input";
