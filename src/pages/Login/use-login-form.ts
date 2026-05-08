import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useLogin } from "@/hooks/use-login";

export const loginFormSchema = z.object({
	username: z.string().min(1, "Informe o usuário"),
	password: z.string().min(1, "Informe a senha"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const useLoginForm = () => {
	const { mutateAsync, isPending } = useLogin();

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginFormSchema),
	});

	const values = watch();

	const onSubmit = async (values: LoginFormValues) => {
		await mutateAsync({
			password: values.password,
			username: values.username.trim(),
		});
	};

	return {
		errors,
		values,
		isPending,

		onSubmit,
		register,
		handleSubmit,
	};
};
