import type { ReactElement } from "react"

import { Typography } from "@/components/ui"

const MensalistasPage = (): ReactElement => (
  <div className="w-full max-w-5xl">
    <header className="flex flex-col gap-3">
      <Typography as="h1" className="text-2xl font-semibold tracking-tight text-estapar-medium-gray">
        Mensalistas
      </Typography>
      <Typography as="p" className="max-w-2xl text-sm leading-relaxed text-estapar-dark-gray">
        Esta página está em desenvolvimento e não será implementada neste desafio.
      </Typography>
    </header>
  </div>
)

export default MensalistasPage
