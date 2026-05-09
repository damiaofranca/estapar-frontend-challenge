import type { ReactElement } from "react"

import { BranchIcon } from "@/components/icons/branch"
import { MapPinIcon } from "@/components/icons/map-pin"
import { GaragesIcon } from "@/components/icons/garage"
import type { Garage } from "@/services/garages/garages-types"

type GarageDetailsHeaderProps = {
	garage: Garage
}

export const GarageDetailsHeader = ({ garage }: GarageDetailsHeaderProps): ReactElement => (
	<header className="flex flex-col gap-2 mt-2">
		<p className="text-sm text-estapar-muted">Código: &nbsp;{garage?.code ?? "-"}</p>
		<p className="flex items-center gap-2 text-sm text-estapar-muted uppercase mt-2">
			<MapPinIcon className="h-5 w-5" />
			{garage?.address ?? "-"}
		</p>
		<p className="flex flex-wrap items-center gap-2 text-sm text-estapar-muted">
			<BranchIcon className="h-5 w-5" />
			<span>
				Filial: <span className="uppercase">{garage?.subsidiary ?? "-"}</span>
			</span>
			<span>-</span>
			<span className="uppercase">{garage?.state ?? "-"}</span>
			<span>·</span>
			<span>
				Regional: <span className="uppercase">{garage?.region ?? "-"}</span>
			</span>
		</p>
	</header>
)

interface GarageDetailTitleProps {
	garage: Garage | null
	isTitleLoading?: boolean
}

export const GarageDetailTitle = ({
	garage,
	isTitleLoading = false,
}: GarageDetailTitleProps): ReactElement => (
	<div className="flex items-center gap-3">
		<GaragesIcon className="h-6 w-6 text-estapar-medium-gray" />
		<h2 className="text-xl font-bold tracking-tight text-estapar-medium-gray">
			{isTitleLoading ? "Carregando..." : (garage?.name ?? "Detalhes da garagem")}
		</h2>
	</div>
)
