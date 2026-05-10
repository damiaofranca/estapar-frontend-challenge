import { type ReactElement } from "react"

import { UserIcon } from "@/components/icons/user"
import { LockIcon } from "@/components/icons/lock"
import { ESTAPAR_LOGO_SRC } from "@/config/constants"
import { Button, Input, Typography } from "@/components/ui"

import { useLoginForm } from "./use-login-form"

const LoginPage = (): ReactElement => {
  const { handleSubmit, onSubmit, register, errors, isPending } = useLoginForm()

  return (
    <div
      data-testid="login-page"
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-estapar-canvas px-4 py-10"
    >
      <img src={ESTAPAR_LOGO_SRC} alt="Estapar" className="h-8" />

      <div className="w-full max-w-md rounded-lg border border-estapar-border bg-estapar-surface p-6 shadow-sm shadow-estapar-border-light/80">
        <Typography as="h1" className="text-base font-semibold leading-snug text-estapar-title">
          Entre com suas credenciais para acessar o sistema
        </Typography>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="group mt-8 flex flex-col gap-6"
          data-disabled={isPending ? "true" : undefined}
        >
          <Input
            type="text"
            label="Usuário"
            inputMode="text"
            spellCheck={false}
            id="login-username"
            data-testid="login-username"
            icon={<UserIcon />}
            disabled={isPending}
            autoComplete="username"
            error={errors.username?.message}
            placeholder="Digite seu usuário"
            labelProps={{ className: "text-estapar-label" }}
            {...register("username")}
          />
          <Input
            label="Senha"
            type="password"
            id="login-password"
            data-testid="login-password"
            icon={<LockIcon />}
            disabled={isPending}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button
            data-testid="login-submit"
            size="lg"
            type="submit"
            variant="primary"
            className="w-full"
            loading={isPending}
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
