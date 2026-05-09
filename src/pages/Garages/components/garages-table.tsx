import type { ReactElement } from "react"

import { EyeIcon } from "@/components/icons/eye"
import { Table, type TableColumn } from "@/components/ui/table"

import type { GaragesRow } from "../use-garages-page"

type GaragesTableProps = {
	rows: GaragesRow[]
	isLoading: boolean
	pageIndex: number
	pageSize: number
	totalCount: number
	onPageChange: (pageIndex: number) => void
	onViewGarage: (garageId: string) => void
}

export const GaragesTable = ({
	rows,
	pageIndex,
	pageSize,
	totalCount,
	isLoading,
	onPageChange,
	onViewGarage,
}: GaragesTableProps): ReactElement => {
	const columns: TableColumn<GaragesRow>[] = [
		{
			key: "code",
			width: "110px",
			frozen: "start",
			header: "Código",
			cell: (row) => row.code,
		},
		{
			key: "name",
			header: "Nome",
			cell: (row) => row.name,
		},
		{
			key: "address",
			header: "Endereço",
			cell: (row) => row.address,
		},
		{
			key: "cityUf",
			header: "Cidade/UF",
			width: "140px",
			cell: (row) => row.cityUf,
		},
		{
			key: "region",
			header: "Regional",
			width: "110px",
			cell: (row) => row.region,
		},
		{
			key: "actions",
			header: "Ações",
			align: "right",
			width: "90px",
			frozen: "end",
			cell: (row) => (
				<div className="flex justify-end">
					<button
						type="button"
						tabIndex={0}
						aria-label={`Ver detalhes da garagem ${row.name}`}
						data-tooltip-content="Ver detalhes"
						data-tooltip-id="estapar-sidebar-tooltip"
						onClick={() => onViewGarage(row.code)}
						className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-estapar-muted transition-colors hover:bg-estapar-muted-surface-alt hover:text-estapar-body focus:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring"
					>
						<EyeIcon className="h-4 w-4" />
					</button>
				</div>
			),
		},
	]

	return (
		<Table
			data={rows}
			columns={columns}
			getRowKey={(row) => row.code}
			emptyMessage={isLoading ? "Carregando..." : "Nenhuma garagem encontrada."}
			pagination={{
				pageIndex,
				pageSize,
				totalCount,
				onPageChange,
			}}
		/>
	)
}
