import { z } from "zod"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch, type SubmitHandler } from "react-hook-form"

import { isActiveFlag } from "@/lib/format"
import type { SelectOption } from "@/components/ui"
import { Mask, addDaysIso, todayIsoDate, toIsoDate } from "@/utils"
import { useCreatePlanMutation, useUpdatePlanMutation } from "@/hooks"
import {
	type Plan,
	VehicleType,
	type UpdatePlanPayload,
	type CreatePlanPayload,
} from "@/services/plans/plans-types"

export const vehicleTypeOptions: SelectOption[] = [
	{ value: VehicleType.CAR, label: "Carro" },
	{ value: VehicleType.MOTORCYCLE, label: "Moto" },
]

export type PlanFormValues = {
	price: string
	active: boolean
	endValidity: string
	description: string
	vehicleType: number
	startValidity: string
	totalVacancies: number
	cancellationPrice: string
}

export const buildPlanFormDefaults = (plan?: Plan | null): PlanFormValues => {
	const start = todayIsoDate()
	if (!plan) {
		return {
			active: true,
			description: "",
			totalVacancies: 1,
			startValidity: start,
			vehicleType: VehicleType.CAR,
			price: Mask.moneyMask.format("0"),
			endValidity: addDaysIso(start, 365),
			cancellationPrice: Mask.moneyMask.format("0"),
		}
	}

	return {
		active: isActiveFlag(plan.active),
		description: plan.description ?? "",
		totalVacancies: plan.totalVacancies,
		endValidity: toIsoDate(plan.endValidity),
		startValidity: toIsoDate(plan.startValidity),
		vehicleType: plan.VeichleType || plan.veichleType,
		price: Mask.formatCentsToMoneyMask(plan.priceInCents),
		cancellationPrice: Mask.formatCentsToMoneyMask(plan.amountDailyCancellationInCents),
	}
}

const planActiveToApiString = (active: boolean): string => (active ? "S" : "N")

const buildBasePayload = (values: PlanFormValues, garageId: string): CreatePlanPayload => {
	const description = values.description.trim()
	const priceCents = Mask.moneyMaskToCents(values.price)
	const cancellationCents = Mask.moneyMaskToCents(values.cancellationPrice)

	return {
		garageId,
		description,
		endValidity: values.endValidity,
		priceInCents: String(priceCents),
		descriptionAvailable: description,
		startValidity: values.startValidity,
		totalVacancies: values.totalVacancies,
		veichleType: String(values.vehicleType),
		active: planActiveToApiString(values.active),
		amountDailyCacellationInCents: String(cancellationCents),
	}
}

export const buildCreatePlanPayload = (
	values: PlanFormValues,
	garageId: string,
): CreatePlanPayload => buildBasePayload(values, garageId)

export const buildUpdatePlanPayload = (values: PlanFormValues, plan: Plan): UpdatePlanPayload => ({
	...buildBasePayload(values, String(plan.idGarage)),
	id: String(plan.idPlan),
})

export const planFormSchema = z
	.object({
		description: z
			.string()
			.trim()
			.min(1, "Informe a descrição do plano")
			.max(120, "Descrição muito longa"),
		vehicleType: z
			.number("Selecione o tipo de veículo")
			.refine((value) => Number.isFinite(value))
			.int()
			.min(1, "Selecione o tipo de veículo"),
		totalVacancies: z
			.number("Informe o total de vagas")
			.refine((value) => Number.isFinite(value))
			.int()
			.min(1, "Total de vagas deve ser maior que zero"),
		price: z
			.string()
			.min(1, "Informe o valor")
			.refine(
				(value) => Mask.moneyMaskToCents(value) > 0,
				"O valor mensal deve ser maior que zero",
			),
		cancellationPrice: z
			.string()
			.min(1, "Informe o valor de cancelamento")
			.refine(
				(value) => Mask.moneyMaskToCents(value) > 0,
				"O valor de cancelamento deve ser maior que zero",
			),
		startValidity: z.string().min(1, "Informe o início da validade"),
		endValidity: z.string().min(1, "Informe o fim da validade"),
		active: z.boolean(),
	})
	.refine((values) => values.endValidity >= values.startValidity, {
		path: ["endValidity"],
		message: "Fim da validade deve ser maior ou igual ao início",
	})

export type PlanFormSchema = z.infer<typeof planFormSchema>

type UsePlanFormParams = {
	open: boolean
	garageId: string
	plan?: Plan | null
	onSuccess?: () => void
}

export const usePlanForm = ({ plan, open, garageId, onSuccess }: UsePlanFormParams) => {
	const isEditMode = plan != null

	const { mutateAsync: createPlan, isPending: isCreating } = useCreatePlanMutation({
		onSuccess: () => {
			toast.success("Plano criado com sucesso")
			onSuccess?.()
			reset(buildPlanFormDefaults(plan))
		},
	})

	const { mutateAsync: updatePlan, isPending: isUpdating } = useUpdatePlanMutation({
		onSuccess: () => {
			toast.success("Plano atualizado com sucesso")
			onSuccess?.()
		},
	})

	const isPending = isCreating || isUpdating

	const {
		reset,
		control,
		setValue,
		register,
		clearErrors,
		handleSubmit,
		formState: { errors },
	} = useForm<PlanFormValues>({
		resolver: zodResolver(planFormSchema),
		defaultValues: buildPlanFormDefaults(plan),
	})

	const active = useWatch({ control, name: "active" })

	const handleChangeStatus = (value: boolean) => {
		setValue("active", value)
		clearErrors("active")
	}

	const onSubmit: SubmitHandler<PlanFormValues> = async (values) => {
		if (plan) {
			await updatePlan(buildUpdatePlanPayload(values, plan))
		} else {
			await createPlan(buildCreatePlanPayload(values, garageId))
		}
	}

	useEffect(() => {
		reset(buildPlanFormDefaults(plan))
	}, [plan, reset, open])
	return {
		errors,
		active,
		control,
		isPending,
		isEditMode,

		onSubmit,
		setValue,
		register,
		clearErrors,
		handleSubmit,
		handleChangeStatus,
	}
}
