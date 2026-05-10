import { z } from "zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@/config/constants"
import { setAuthToken } from "@/store/auth-store"
import { authenticationService } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"

export const loginFormSchema = z.object({
  username: z.string().min(1, "Informe o usuário"),
  password: z.string().min(1, "Informe a senha"),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const useLoginForm = () => {
  const navigate = useNavigate()

  const { mutateAsync, isPending } = authenticationService.useLogin({
    onSuccess: (response) => {
      setAuthToken(response.data.token)
      navigate(ROUTES.HOME, { replace: true })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (values: LoginFormValues) => {
    await mutateAsync({
      password: values.password,
      username: values.username.trim(),
    })
  }

  return {
    errors,
    isPending,

    onSubmit,
    register,
    handleSubmit,
  }
}
