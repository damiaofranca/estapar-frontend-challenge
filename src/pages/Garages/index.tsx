import type { ReactElement } from "react"

import { GaragesIcon } from "@/components/icons/garage"
import { Typography } from "@/components/ui"
import { useGaragesPage } from "./use-garages-page"
import { GaragesFilters } from "./components/garages-filters"
import { GaragesTable } from "./components/garages-table"
import { GarageDetailsDrawer } from "./components/garage-details-drawer"

const GaragesPage = (): ReactElement => {
  const {
    rows,
    pageSize,
    pageIndex,
    garageName,
    totalCount,
    garagesQuery,
    isDetailsOpen,
    selectedGarageId,
    mensalistaDigital,
    tableEmptyMessage,

    onViewGarage,
    onPageChange,
    onCloseDetails,
    onGarageNameChange,
    onMensalistaDigitalChange,
  } = useGaragesPage()

  return (
    <div className="w-full">
      <header className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-1">
          <div className="flex items-center gap-3">
            <GaragesIcon className="h-6 w-6" aria-hidden />
            <Typography as="h1" className="text-2xl font-semibold tracking-tight text-estapar-medium-gray">
              Garagens
            </Typography>
          </div>
          <Typography as="p" className="text-sm text-estapar-dark-gray">
            Visualize as garagens habilitadas para mensalistas digitais.
          </Typography>
        </div>
        <GaragesFilters
          garageName={garageName}
          totalCount={totalCount}
          mensalistaDigital={mensalistaDigital}
          onGarageNameChange={onGarageNameChange}
          onMensalistaDigitalChange={onMensalistaDigitalChange}
        />
      </header>
      <section className="mt-4">
        <GaragesTable
          rows={rows}
          pageSize={pageSize}
          pageIndex={pageIndex}
          totalCount={totalCount}
          onPageChange={onPageChange}
          onViewGarage={onViewGarage}
          emptyMessage={tableEmptyMessage}
          isLoading={garagesQuery.isFetching}
        />
      </section>
      <GarageDetailsDrawer open={isDetailsOpen} onClose={onCloseDetails} garageId={selectedGarageId} />
    </div>
  )
}

export default GaragesPage
