import { type ReactElement } from "react";

import { Mask } from "@/utils";
import type { Plan } from "@/services/plans/plans-types";
import { Button, Input, Modal, Select, Switch, Label } from "@/components/ui";

import { usePlanForm, vehicleTypeOptions } from "./use-plan-form";

export type PlanFormModalProps = {
  open: boolean;
  garageId: string;
  plan?: Plan | null;
  onClose: () => void;
};

export const PlanFormModal = ({
  open,
  plan,
  garageId,
  onClose,
}: PlanFormModalProps): ReactElement | null => {
  const {
    errors,
    values,
    isPending,
    isEditMode,

    register,
    onSubmit,
    handleSubmit,
    handleChangeStatus,
  } = usePlanForm({
    open,
    plan,
    garageId,
    onSuccess: onClose,
  });

  if (!open) {
    return null;
  }

  const title = isEditMode ? "Editar Plano" : "Novo Plano";
  const description = isEditMode
    ? "Atualize as informações do plano selecionado."
    : "Preencha os dados para criar um novo plano.";
  const submitLabel = isEditMode ? "Salvar" : "Criar";

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      description={description}
      className="w-full max-w-lg"
      closeOnOverlayClick={!isPending}
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="group flex flex-col gap-5"
        data-disabled={isPending ? "true" : undefined}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Descrição"
            disabled={isPending}
            error={errors.description?.message}
            placeholder="Digite a descrição do plano"
            {...register("description")}
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="plan-active-switch">Status</Label>
            <Switch
              name="active"
              rootClassName="h-10"
              disabled={isPending}
              checked={values.active}
              id="plan-active-switch"
              onCheckedChange={handleChangeStatus}
              label={values.active ? "Ativo" : "Inativo"}
              labelClassName={values.active ? "text-estapar-success" : "text-estapar-muted"}
            />
          </div>

          <Select
            disabled={isPending}
            label="Tipo de Veículo"
            options={vehicleTypeOptions}
            error={errors.vehicleType?.message}
            {...register("vehicleType", { valueAsNumber: true })}
          />

          <Input
            min={1}
            step={1}
            type="number"
            placeholder="0"
            inputMode="numeric"
            disabled={isPending}
            label="Total de Vagas"
            error={errors.totalVacancies?.message}
            {...register("totalVacancies", { valueAsNumber: true })}
          />

          <Input
            type="text"
            label="Valor (R$)"
            inputMode="decimal"
            disabled={isPending}
            placeholder="R$ 0,00"
            mask={Mask.moneyMask}
            error={errors.price?.message}
            {...register("price")}
          />

          <Input
            type="text"
            inputMode="decimal"
            disabled={isPending}
            placeholder="R$ 0,00"
            mask={Mask.moneyMask}
            label="Valor do Cancelamento (R$)"
            error={errors.cancellationPrice?.message}
            {...register("cancellationPrice")}
          />

          <Input
            type="date"
            disabled={isPending}
            label="Início da Validade"
            error={errors.startValidity?.message}
            {...register("startValidity")}
          />

          <Input
            type="date"
            disabled={isPending}
            label="Fim da Validade"
            error={errors.endValidity?.message}
            {...register("endValidity")}
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
          <Button
            size="md"
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button size="md" type="submit" variant="primary" disabled={isPending} loading={isPending}>
            {submitLabel}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
