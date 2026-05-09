import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from "react"

import { cn } from "@/lib/cn"

import { Label, type LabelProps } from "./label"
import { Typography } from "./typography"

export const selectRootClassName =
  "peer flex h-10 w-full min-w-0 cursor-pointer appearance-none rounded-md border border-estapar-border-input bg-estapar-surface px-3 py-2 pr-10 text-sm leading-none text-estapar-body shadow-sm outline-none transition-[color,box-shadow] focus-visible:border-estapar-primary focus-visible:ring-[3px] focus-visible:ring-estapar-ring/35 disabled:cursor-not-allowed disabled:opacity-50"

export type SelectOption = {
  label: string
  value: string | number
  disabled?: boolean
}

type SelectOwnProps = {
  label?: ReactNode
  labelProps?: Omit<LabelProps, "htmlFor" | "children">
  error?: ReactNode
  hint?: ReactNode
  options: SelectOption[]
  placeholder?: string
  rootClassName?: string
}

export type SelectProps = Omit<ComponentPropsWithoutRef<"select">, "children"> & SelectOwnProps

const fieldRootClassName =
  "flex flex-col gap-2 has-[[data-slot=select]:disabled]:[&_label]:pointer-events-none has-[[data-slot=select]:disabled]:[&_label]:cursor-not-allowed has-[[data-slot=select]:disabled]:[&_label]:opacity-50"

const isComposed = (props: SelectOwnProps): boolean =>
  Boolean(props.label != null || props.error != null || props.hint != null)

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      hint,
      error,
      label,
      options,
      placeholder,
      labelProps,
      className,
      rootClassName,
      id: idProp,
      "aria-describedby": ariaDescribedByProp,
      "aria-invalid": ariaInvalidProp,
      ...rest
    },
    ref,
  ) => {
    const reactId = useId()
    const composed = isComposed({ label, error, hint, options })
    const selectId = idProp ?? (composed ? reactId : undefined)
    const errorId = `${reactId}-error`
    const hintId = `${reactId}-hint`

    const describedByParts = [
      ariaDescribedByProp,
      composed && error != null && error !== false ? errorId : undefined,
      composed && hint != null ? hintId : undefined,
    ].filter((v): v is string => typeof v === "string" && v.length > 0)
    const ariaDescribedBy = describedByParts.length > 0 ? describedByParts.join(" ") : undefined

    const ariaInvalid = ariaInvalidProp ?? (error != null && error !== false ? true : undefined)

    const selectEl = (
      <div className="relative shrink-0">
        <select
          ref={ref}
          id={composed ? selectId : idProp}
          data-slot="select"
          aria-invalid={ariaInvalid}
          aria-describedby={ariaDescribedBy}
          className={cn(selectRootClassName, className)}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-estapar-subtle"
        >
          <path
            d="M5 7l5 6 5-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )

    if (!composed) {
      return selectEl
    }

    const { className: labelClassName, ...restLabelProps } = labelProps ?? {}

    return (
      <div className={cn(fieldRootClassName, rootClassName)}>
        {label != null ? (
          <Label htmlFor={selectId} className={cn(labelClassName)} {...restLabelProps}>
            {label}
          </Label>
        ) : null}

        {selectEl}

        {error != null && error !== false ? (
          <Typography as="p" id={errorId} role="alert" className="text-sm font-medium text-estapar-error">
            {error}
          </Typography>
        ) : null}

        {hint != null ? (
          <Typography as="p" id={hintId} className="text-sm text-estapar-muted">
            {hint}
          </Typography>
        ) : null}
      </div>
    )
  },
)

Select.displayName = "Select"
