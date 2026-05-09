import type { KeyboardEvent, ReactElement, ReactNode } from "react"

import { cn } from "@/lib/cn"

export type TabItem<TValue extends string = string> = {
	value: TValue
	label: ReactNode
	disabled?: boolean
}

type TabsProps<TValue extends string = string> = {
	value: TValue
	className?: string
	tabClassName?: string
	items: TabItem<TValue>[]
	onChange: (value: TValue) => void
	"aria-label"?: string
}

const tabBaseClassName =
	"relative inline-flex h-10 items-center justify-center rounded-md rounded-b-none px-3 text-sm font-medium text-estapar-dark-blue bg-white transition-colors hover:text-estapar-body focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer border-b-2 border-white"

const tabActiveClassName = "border-estapar-border-lime-light"

export const Tabs = <TValue extends string>({
	items,
	value,
	onChange,
	className,
	tabClassName,
	"aria-label": ariaLabel,
}: TabsProps<TValue>): ReactElement => {
	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, nextValue: TValue): void => {
		if (event.key !== "Enter" && event.key !== " ") {
			return
		}
		event.preventDefault()
		onChange(nextValue)
	}

	return (
		<div
			role="tablist"
			aria-label={ariaLabel}
			className={cn(
				"inline-flex items-center gap-1 rounded-lg rounded-b-none bg-estapar-muted-surface-alt p-1 pb-0 border-b-2 border-estapar-border",
				className,
			)}
		>
			{items.map((item) => {
				const isActive = item.value === value

				return (
					<button
						role="tab"
						type="button"
						key={item.value}
						disabled={item.disabled}
						aria-selected={isActive}
						tabIndex={isActive ? 0 : -1}
						onClick={() => onChange(item.value)}
						onKeyDown={(event) => handleKeyDown(event, item.value)}
						className={cn(tabBaseClassName, isActive && tabActiveClassName, tabClassName)}
					>
						{item.label}
					</button>
				)
			})}
		</div>
	)
}
