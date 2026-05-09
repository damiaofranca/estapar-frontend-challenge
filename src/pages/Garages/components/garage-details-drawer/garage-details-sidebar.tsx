import type { KeyboardEvent, ReactElement, ReactNode } from "react"

import { cn } from "@/lib/cn"
import { MoneyIcon } from "@/components/icons/money"
import { DiscountIcon } from "@/components/icons/discount"
import { SettingsIcon } from "@/components/icons/settings"

export type GarageDetailsSection = "plans" | "discounts" | "settings"

type SidebarItem = {
  value: GarageDetailsSection
  label: string
  icon: ReactNode
}

const sidebarItems: SidebarItem[] = [
  {
    value: "plans",
    label: "Planos",
    icon: <MoneyIcon className="h-4 w-4 text-estapar-caption" />,
  },
  {
    value: "discounts",
    label: "Descontos",
    icon: <DiscountIcon className="h-4 w-4 text-estapar-caption" />,
  },
  {
    value: "settings",
    label: "Configurações",
    icon: <SettingsIcon className="h-4 w-4 text-estapar-caption" />,
  },
]

type GarageDetailsSidebarProps = {
  activeSection: GarageDetailsSection
  onSectionChange: (section: GarageDetailsSection) => void
}

const itemBaseClassName =
  "relative flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium text-estapar-muted transition-colors hover:bg-estapar-muted-surface hover:text-estapar-body focus:outline-none cursor-pointer"

const itemActiveClassName =
  "text-estapar-body before:absolute before:left-0 before:top-1/2 before:h-full before:w-0.75 before:-translate-y-1/2 before:bg-estapar-primary bg-white"

export const GarageDetailsSidebar = ({ activeSection, onSectionChange }: GarageDetailsSidebarProps): ReactElement => {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, section: GarageDetailsSection): void => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }
    event.preventDefault()
    onSectionChange(section)
  }

  return (
    <nav
      aria-label="Seções da garagem"
      className="min-h-36 flex w-full shrink-0 flex-col rounded-lg rounded-r-none border border-estapar-border-light bg-estapar-sidebar-surface sm:w-48 overflow-hidden"
    >
      {sidebarItems.map((item) => {
        const isActive = item.value === activeSection

        return (
          <button
            type="button"
            key={item.value}
            onClick={() => onSectionChange(item.value)}
            aria-current={isActive ? "page" : undefined}
            onKeyDown={(event) => handleKeyDown(event, item.value)}
            className={cn(itemBaseClassName, isActive && itemActiveClassName)}
          >
            {item.icon}
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
