import { useMemo, useState, type ReactElement } from "react"

import { cn } from "@/lib/cn"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { EditIcon } from "@/components/icons/edit"
import { PlusIcon } from "@/components/icons/plus"
import { Badge, Typography } from "@/components/ui"
import { formatInteger, isActiveFlag } from "@/lib/format"
import { Table, type TableColumn } from "@/components/ui/table"
import { MensalistasIcon } from "@/components/icons/mensalistas"

import { plansService } from "@/services"
import { PlanFormModal } from "../../../PlanFormModal"
import { VehicleType } from "@/services/plans/plans-types"
import { MotocycleIcon } from "@/components/icons/motocycle"
import { buildPlanRows, formatPlanValue, type PlanRow } from "@/utils/garage-plans-utils"

const editButtonClassName = cn(
  "inline-flex h-8 w-8 items-center justify-center rounded-md text-estapar-muted transition-colors cursor-pointer",
  "hover:bg-estapar-muted-surface-alt hover:text-estapar-body",
)

type GaragePlansSectionProps = {
  garageId: string
  garageAvailableVacancies: number
}

export const GaragePlansSection = ({ garageId, garageAvailableVacancies }: GaragePlansSectionProps): ReactElement => {
  const plansQuery = plansService.useGetPlansQuery({ garageId })

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PlanRow | null>(null)

  const isPlansLoading = plansQuery.isPending

  const rows = useMemo(() => buildPlanRows(plansQuery.data ?? []), [plansQuery.data])

  const handleOpenCreate = (): void => {
    setEditingPlan(null)
    setIsPlanModalOpen(true)
  }

  const handleOpenEdit = (plan: PlanRow): void => {
    setEditingPlan(plan)
    setIsPlanModalOpen(true)
  }

  const handleCloseForm = (): void => {
    setIsPlanModalOpen(false)
    setEditingPlan(null)
  }

  const columns: TableColumn<PlanRow>[] = [
    {
      width: "200px",
      frozen: "start",
      key: "description",
      header: "Descrição",
      cell: (row) => (
        <Typography as="span" className="flex items-center gap-2 text-estapar-body">
          {row.VeichleType === VehicleType.MOTORCYCLE ? (
            <MotocycleIcon className="h-4 w-4 shrink-0 text-estapar-muted" />
          ) : (
            <MensalistasIcon className="h-4 w-4 shrink-0 text-estapar-muted" />
          )}
          {row.description}
        </Typography>
      ),
    },
    {
      key: "price",
      width: "120px",
      header: "Valor",
      cell: (row) => formatPlanValue(row),
    },
    {
      width: "80px",
      header: "Vagas",
      key: "totalVacancies",
      cell: (row) => formatInteger(row.totalVacancies),
    },
    {
      width: "80px",
      header: "Ocupadas",
      key: "occupiedForDisplay",
      cell: (row) => formatInteger(row.occupiedForDisplay),
    },
    {
      width: "80px",
      header: "Disponíveis",
      key: "availableVacancies",
      cell: (row) => formatInteger(row.availableVacancies),
    },
    {
      key: "status",
      width: "100px",
      header: "Status",
      cell: (row) => {
        const active = isActiveFlag(row.active)
        return <Badge variant={active ? "success" : "neutral"}>{active ? "Ativo" : "Inativo"}</Badge>
      },
    },
    {
      frozen: "end",
      width: "80px",
      key: "actions",
      header: "Ações",
      align: "center",
      cell: (row) => (
        <button
          type="button"
          className={editButtonClassName}
          data-tooltip-content="Editar plano"
          data-tooltip-id="estapar-sidebar-tooltip"
          onClick={() => handleOpenEdit(row)}
        >
          <EditIcon className="h-4 w-4 text-estapar-dark-blue" />
        </button>
      ),
    },
  ]

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-4 border-t border-estapar-border-light px-4 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Typography as="h3" className="text-base font-semibold text-estapar-dark-blue">
          Planos Disponíveis
        </Typography>
        <Button
          size="sm"
          variant="outline"
          startIcon={<PlusIcon />}
          onClick={handleOpenCreate}
          data-testid="plan-form-open-create"
          className="border-estapar-success bg-transparent! text-estapar-success"
        >
          Novo Plano
        </Button>
      </div>

      {isPlansLoading ? (
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-lg border border-estapar-border-light bg-estapar-surface py-10">
          <Spinner size="sm" />
        </div>
      ) : (
        <Table
          data={rows}
          columns={columns}
          getRowKey={(row) => String(row.idPlan)}
          emptyMessage="Nenhum plano cadastrado."
        />
      )}
      <PlanFormModal
        plan={editingPlan}
        garageId={garageId}
        open={isPlanModalOpen}
        onClose={handleCloseForm}
        garageAvailableVacancies={garageAvailableVacancies}
      />
    </section>
  )
}
