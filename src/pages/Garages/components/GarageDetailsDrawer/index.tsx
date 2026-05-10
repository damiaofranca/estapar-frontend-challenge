import { useMemo, useState, type ReactElement } from "react"

import { Typography } from "@/components/ui"
import { Drawer } from "@/components/ui/drawer"
import { QrCode } from "@/components/ui/qr-code"
import { Tabs, type TabItem } from "@/components/ui/tabs"
import { QUERY_PARAMS, ROUTES } from "@/config/constants"

import { garagesService } from "@/services"
import { GarageStatsCards } from "./components/GarageStatsCards"
import { GaragePlansSection } from "./components/GaragePlansSection"
import { GarageDetailsHeader, GarageDetailTitle } from "./components/GarageDetailsHeader"
import { type GarageDetailsSection, GarageDetailsSidebar } from "./components/GarageDetailsSidebar"

const buildGarageDeepLink = (garageId: string): string => {
  if (typeof window === "undefined") {
    return `${ROUTES.GARAGES}?${QUERY_PARAMS.GARAGE_ID}=${encodeURIComponent(garageId)}`
  }
  const url = new URL(ROUTES.GARAGES, window.location.origin)
  url.searchParams.set(QUERY_PARAMS.GARAGE_ID, garageId)
  return url.toString()
}

type GarageDetailsTab = "digital"

type GarageDetailsDrawerProps = {
  open: boolean
  garageId: string | null
  onClose: () => void
}

const drawerTabs: TabItem<GarageDetailsTab>[] = [{ value: "digital", label: "Mensalista Digital" }]

const SectionPlaceholder = ({ title }: { title: string }): ReactElement => (
  <section className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-r-lg border border-l-0 border-estapar-border-light bg-estapar-canvas px-6 py-12 text-center">
    <Typography as="h3" className="text-base font-semibold text-estapar-medium-gray">
      {title}
    </Typography>
    <Typography as="p" className="mt-2 max-w-md text-sm text-estapar-muted">
      Esta seção estará disponível em breve.
    </Typography>
  </section>
)

export const GarageDetailsDrawer = ({ open, garageId, onClose }: GarageDetailsDrawerProps): ReactElement => {
  const [activeTab, setActiveTab] = useState<GarageDetailsTab>("digital")
  const [activeSection, setActiveSection] = useState<GarageDetailsSection>("plans")

  const garageQuery = garagesService.useGetGarageQuery({
    garageId: garageId ?? "",
  })

  const garage = garageQuery.data ?? null
  const isGarageLoading = open && garageId != null && garage == null && garageQuery.isFetching

  const availableSpaces = (garage?.countSpaces ?? 0) - (garage?.occupiedSpaces ?? 0)

  const garageDeepLink = useMemo(() => (garageId ? buildGarageDeepLink(garageId) : ""), [garageId])

  const renderBody = (): ReactElement | null => {
    if (!open) {
      return null
    }

    if (garageId == null) {
      return (
        <Typography
          as="p"
          className="rounded-lg border border-estapar-border-light bg-estapar-surface p-6 text-sm text-estapar-muted"
        >
          Nenhuma garagem selecionada.
        </Typography>
      )
    }

    if (isGarageLoading) {
      return (
        <Typography as="p" className="p-6 text-center text-sm text-estapar-muted">
          Carregando detalhes da garagem...
        </Typography>
      )
    }

    if (!garage) {
      return null
    }

    return (
      <div className="flex flex-col gap-6">
        <GarageDetailsHeader garage={garage} />
        <Tabs value={activeTab} items={drawerTabs} onChange={setActiveTab} aria-label="Categorias da garagem" />
        <div className="flex flex-col gap-4 sm:flex-row items-center sm:justify-between sm:gap-6">
          <GarageStatsCards
            className="w-full"
            totalSpaces={garage.countSpaces}
            availableSpaces={availableSpaces}
            occupiedSpaces={garage.occupiedSpaces}
          />
          <QrCode size={86} value={garageDeepLink} className="max-sm:-order-1" title={`Abrir garagem ${garage.name}`} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start">
          <GarageDetailsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          {activeSection === "plans" ? (
            <GaragePlansSection garageId={garageId} garageAvailableVacancies={Math.max(0, availableSpaces)} />
          ) : null}
          {activeSection === "discounts" ? <SectionPlaceholder title="Descontos" /> : null}
          {activeSection === "settings" ? <SectionPlaceholder title="Configurações" /> : null}
        </div>
      </div>
    )
  }

  const isTitleLoading = open && garageId != null && isGarageLoading

  return (
    <Drawer
      open={open}
      onClose={onClose}
      headerSlot={<GarageDetailTitle garage={garage} isTitleLoading={isTitleLoading} />}
    >
      {renderBody()}
    </Drawer>
  )
}
