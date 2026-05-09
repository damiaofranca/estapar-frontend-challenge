import type { ReactElement } from "react"

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
      <Switch label="Mensalista Digital" checked={mensalistaDigital} onCheckedChange={onMensalistaDigitalChange} />

      <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-end lg:gap-4">
        <p className="shrink-0 text-sm text-estapar-muted">
          <span className="font-medium text-estapar-body">{totalCount}</span>
          {" registros"}
        </p>
        <Input
          value={garageName}
          aria-label="Buscar por nome"
          placeholder="Buscar por nome"
          icon={<SearchIcon className="h-4 w-4" />}
          className="w-full min-w-0 lg:max-w-md xl:w-72"
          onChange={(e) => onGarageNameChange(e.target.value)}
        />
      </div>
    </div>
  </div>
)
