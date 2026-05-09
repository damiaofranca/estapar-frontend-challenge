import {
  useId,
  forwardRef,
  type ReactNode,
  type ChangeEvent,
  type KeyboardEvent,
  type ComponentPropsWithoutRef,
} from "react"

import { cn } from "@/lib/cn"

export type SwitchSize = "sm" | "md"

const switchTrackClassName =
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-estapar-surface disabled:cursor-not-allowed disabled:opacity-60"

const switchTrackSizeClassName: Record<SwitchSize, string> = {
  sm: "h-4 w-7",
  md: "h-5 w-9",
}

const switchThumbSizeClassName: Record<SwitchSize, string> = {
  sm: "h-3 w-3 translate-x-0.5",
  md: "h-4 w-4 translate-x-0.5",
}

const switchTrackThumbCheckedClassName: Record<SwitchSize, string> = {
  sm: "peer-checked:[&>span]:translate-x-3.5",
  md: "peer-checked:[&>span]:translate-x-4",
}

type SwitchOwnProps = {
  size?: SwitchSize
  label?: ReactNode
  rootClassName?: string
  labelClassName?: string
  onCheckedChange?: (checked: boolean) => void
}

export type SwitchProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "size"> & SwitchOwnProps

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      disabled,
      className,
      id: idProp,
      size = "md",
      rootClassName,
      labelClassName,
      onChange,
      onCheckedChange,
      ...rest
    },
    ref,
  ) => {
    const reactId = useId()
    const inputId = idProp ?? reactId

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
      onChange?.(event)
      onCheckedChange?.(event.target.checked)
    }

    const handleLabelKeyDown = (event: KeyboardEvent<HTMLLabelElement>): void => {
      if (event.key !== "Enter" && event.key !== " ") {
        return
      }

      event.preventDefault()
      const control = event.currentTarget.control
      if (control instanceof HTMLInputElement) {
        control.click()
      }
    }

    return (
      <label
        tabIndex={-1}
        htmlFor={inputId}
        onKeyDown={handleLabelKeyDown}
        className={cn(
          "inline-flex items-center gap-2 select-none",
          disabled && "cursor-not-allowed opacity-60",
          rootClassName,
        )}
      >
        <input
          ref={ref}
          id={inputId}
          role="switch"
          type="checkbox"
          disabled={disabled}
          onChange={handleChange}
          className="peer sr-only"
          {...rest}
        />

        <span
          aria-hidden
          className={cn(
            switchTrackClassName,
            switchTrackSizeClassName[size],
            switchTrackThumbCheckedClassName[size],
            "bg-estapar-border-input peer-checked:bg-estapar-primary",
            className,
          )}
        >
          <span
            className={cn(
              "pointer-events-none inline-block rounded-full bg-estapar-surface shadow-sm transition-transform duration-200 ease-out will-change-transform",
              switchThumbSizeClassName[size],
            )}
          />
        </span>

        {label != null ? (
          <span className={cn("text-sm font-medium text-estapar-body", labelClassName)}>{label}</span>
        ) : null}
      </label>
    )
  },
)

Switch.displayName = "Switch"
