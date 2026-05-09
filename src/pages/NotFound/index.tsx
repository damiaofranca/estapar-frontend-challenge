import type { ReactElement } from "react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui"
import { ROUTES } from "@/config/constants"

const NotFoundPage = (): ReactElement => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-estapar-canvas px-4 py-10 text-center">
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold uppercase tracking-wide text-estapar-primary">Erro 404</p>
      <h1 className="text-3xl font-bold text-estapar-medium-gray">Página não encontrada</h1>
      <p className="max-w-md text-sm text-estapar-dark-gray">
        A página que você procura não existe, foi removida ou está temporariamente indisponível.
      </p>
    </div>
    <Link to={ROUTES.HOME} aria-label="Voltar para a tela inicial">
      <Button size="md" variant="primary">
        Voltar ao início
      </Button>
    </Link>
  </div>
)

export default NotFoundPage
