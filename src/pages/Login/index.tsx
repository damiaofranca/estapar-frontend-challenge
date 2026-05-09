import { type ReactElement } from "react"

import { Button, Input } from "@/components/ui"
import { LockIcon } from "@/components/icons/lock"
import { UserIcon } from "@/components/icons/user"
import logo from "@/assets/estapar-logo.png"

import { useLoginForm } from "./use-login-form"

const LoginPage = (): ReactElement => {
  const { handleSubmit, onSubmit, register, errors, isPending } = useLoginForm()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-estapar-canvas px-4 py-10">
      <img src={logo} alt="Estapar" className="h-8" />

      <div className="w-full max-w-md rounded-lg border border-estapar-border bg-estapar-surface p-6 shadow-sm shadow-estapar-border-light/80">
        <h1 className="text-base font-semibold leading-snug text-estapar-title">
          Entre com suas credenciais para acessar o sistema
        </h1>

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
            icon={<LockIcon />}
            disabled={isPending}
            placeholder="Digite sua senha"
            autoComplete="current-password"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button size="lg" type="submit" variant="primary" className="w-full" loading={isPending}>
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
