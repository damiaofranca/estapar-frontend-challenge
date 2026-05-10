import type { ReactElement } from "react"

import { BranchIcon } from "@/components/icons/branch"
import { MapPinIcon } from "@/components/icons/map-pin"
import { GaragesIcon } from "@/components/icons/garage"
import type { Garage } from "@/services/garages/garages-types"
import { Typography } from "@/components/ui"

type GarageDetailsHeaderProps = {
  garage: Garage
}

export const GarageDetailsHeader = ({ garage }: GarageDetailsHeaderProps): ReactElement => (
  <header className="flex flex-col gap-2 mt-2">
    <Typography as="p" className="text-sm text-estapar-muted">
      Código: &nbsp;{garage?.code ?? "-"}
    </Typography>
    <Typography as="p" className="mt-2 flex items-center gap-2 text-sm uppercase text-estapar-muted">
      <MapPinIcon className="h-5 w-5" />
      {garage?.address ?? "-"}
    </Typography>
    <Typography as="p" className="flex flex-wrap items-center gap-2 text-sm text-estapar-muted">
      <BranchIcon className="h-5 w-5" />
      <Typography as="span">
        Filial:{" "}
        <Typography as="span" className="uppercase">
          {garage?.subsidiary ?? "-"}
        </Typography>
      </Typography>
      <Typography as="span">-</Typography>
      <Typography as="span" className="uppercase">
        {garage?.state ?? "-"}
      </Typography>
      <Typography as="span">·</Typography>
      <Typography as="span">
        Regional:{" "}
        <Typography as="span" className="uppercase">
          {garage?.region ?? "-"}
        </Typography>
      </Typography>
    </Typography>
  </header>
)

interface GarageDetailTitleProps {
  garage: Garage | null
  isTitleLoading?: boolean
}

export const GarageDetailTitle = ({ garage, isTitleLoading = false }: GarageDetailTitleProps): ReactElement => (
  <div className="flex items-center gap-3">
    <GaragesIcon className="h-6 w-6 text-estapar-medium-gray" />
    <Typography as="h2" className="text-xl font-bold tracking-tight text-estapar-medium-gray">
      {isTitleLoading ? "Carregando..." : (garage?.name ?? "Detalhes da garagem")}
    </Typography>
  </div>
)
