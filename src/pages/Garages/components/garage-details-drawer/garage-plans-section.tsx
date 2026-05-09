import { useMemo, type ReactElement } from "react"

import { cn } from "@/lib/cn"
import { useGetPlansQuery } from "@/hooks"
import { Badge } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { EditIcon } from "@/components/icons/edit"
import { PlusIcon } from "@/components/icons/plus"
import { formatInteger, isActiveFlag } from "@/lib/format"
import { MensalistasIcon } from "@/components/icons/mensalistas"
import { Table, type TableColumn } from "@/components/ui/table"

import {
	type PlanRow,
	buildPlanRows,
	formatPlanValue,
} from "@/utils"

const editButtonClassName = cn(
	"inline-flex h-8 w-8 items-center justify-center rounded-md text-estapar-muted transition-colors",
	"hover:bg-estapar-muted-surface-alt hover:text-estapar-body",
	"focus:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring",
)

type GaragePlansSectionProps = {
	garageId: string
	onCreatePlan?: () => void
	onEditPlan?: (planId: string) => void
}

export const GaragePlansSection = ({
	garageId,
	onEditPlan,
	onCreatePlan,
}: GaragePlansSectionProps): ReactElement => {
	const plansQuery = useGetPlansQuery({ garageId })

	const isPlansLoading = plansQuery.isFetching

	const rows = useMemo(
		() => buildPlanRows(plansQuery.data ?? []),
		[plansQuery.data],
	)

	const columns: TableColumn<PlanRow>[] = [
		{
			key: "description",
			header: "Descrição",
			width: "200px",
			frozen: "start",
			cell: (row) => (
				<span className="flex items-center gap-2 text-estapar-body">
					<MensalistasIcon className="h-4 w-4 shrink-0 text-estapar-muted" />
					{row.description}
				</span>
			),
		},
		{
			key: "price",
			header: "Valor",
			width: "120px",
			cell: (row) => formatPlanValue(row),
		},
		{
			key: "totalVacancies",
			header: "Vagas",
			width: "80px",
			cell: (row) => formatInteger(row.totalVacancies),
		},
		{
			key: "occupiedForDisplay",
			header: "Ocupadas",
			width: "80px",
			cell: (row) => formatInteger(row.occupiedForDisplay),
		},
		{
			key: "availableVacancies",
			header: "Disponíveis",
			width: "80px",
			cell: (row) => formatInteger(row.availableVacancies),
		},
		{
			key: "status",
			header: "Status",
			width: "100px",
			cell: (row) => {
				const active = isActiveFlag(row.active)
				return (
					<Badge variant={active ? "success" : "neutral"}>
						{active ? "Ativo" : "Inativo"}
					</Badge>
				)
			},
		},
		{
			key: "actions",
			header: "Ações",
			width: "80px",
			align: "center",
			frozen: "end",
			cell: (row) => (
				<button
					type="button"
					tabIndex={0}
					className={editButtonClassName}
					aria-label={`Editar plano ${row.description}`}
					data-tooltip-content="Editar plano"
					data-tooltip-id="estapar-sidebar-tooltip"
					onClick={() => onEditPlan?.(String(row.idPlan))}
				>
					<EditIcon className="h-4 w-4 text-estapar-dark-blue" />
				</button>
			),
		},
	]

	return (
		<section className="flex min-w-0 flex-1 flex-col gap-4 border-t border-estapar-border-light px-4 pt-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<h3 className="text-base font-semibold text-estapar-dark-blue">
					Planos Disponíveis
				</h3>
				<Button
					size="sm"
					variant="outline"
					onClick={onCreatePlan}
					startIcon={<PlusIcon />}
					className="border-estapar-success bg-transparent! text-estapar-success"
				>
					Novo Plano
				</Button>
			</div>

			{isPlansLoading ? (
				<div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-lg border border-estapar-border-light bg-estapar-surface py-10">
					<Spinner size="md" className="text-estapar-primary" />
				</div>
			) : (
				<Table
					data={rows}
					columns={columns}
					getRowKey={(row) => String(row.idPlan)}
					emptyMessage="Nenhum plano cadastrado."
				/>
			)}
		</section>
	)
}

export type { PlanRow } from "../../../../utils"
