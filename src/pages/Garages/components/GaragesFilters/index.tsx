import type { ReactElement } from "react"

import { Typography } from "@/components/ui"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SearchIcon } from "@/components/icons/search"

type GaragesFiltersProps = {
  garageName: string
  totalCount: number
  mensalistaDigital: boolean
  onGarageNameChange: (value: string) => void
  onMensalistaDigitalChange: (checked: boolean) => void
}

export const GaragesFilters = ({
  garageName,
  totalCount,
  mensalistaDigital,
  onGarageNameChange,
  onMensalistaDigitalChange,
}: GaragesFiltersProps): ReactElement => (
  <div className="rounded-lg border border-estapar-border-light bg-estapar-surface p-4">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <Switch
        data-testid="garages-mensalista-digital-switch"
        label="Mensalista Digital"
        checked={mensalistaDigital}
        onCheckedChange={onMensalistaDigitalChange}
      />
      <Typography as="p" className="shrink-0 text-sm text-estapar-muted">
        {totalCount} &nbsp;registros
      </Typography>
      <Input
        data-testid="garages-search-input"
        value={garageName}
        aria-label="Buscar por nome"
        placeholder="Buscar por nome"
        icon={<SearchIcon className="h-4 w-4" />}
        className="w-full lg:max-w-md xl:w-56"
        onChange={(e) => onGarageNameChange(e.target.value)}
      />
    </div>
  </div>
)
