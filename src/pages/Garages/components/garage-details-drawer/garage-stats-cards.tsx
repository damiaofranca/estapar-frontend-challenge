import type { ReactElement, ReactNode } from "react";

import { UsersIcon } from "@/components/icons/users";
import { cn } from "@/lib/cn";
import { formatInteger } from "@/lib/format";

type GarageStatsCardsProps = {
  totalSpaces: number;
  occupiedSpaces: number;
  availableSpaces: number;
  className?: string;
};

type StatCardProps = {
  label: string;
  value: number;
  valueClassName?: string;
  icon?: ReactNode;
};

const StatCard = ({
  label,
  value,
  icon,
  valueClassName,
}: StatCardProps): ReactElement => (
  <div className="flex flex-col gap-3 rounded-lg border border-estapar-border-light bg-estapar-surface p-4">
    <span className="text-sm font-medium text-estapar-caption">{label}</span>
    <span
      className={cn(
        "flex items-center gap-2 text-2xl font-bold text-estapar-dark-blue",
        valueClassName,
      )}
    >
      {icon}
      {formatInteger(value)}
    </span>
  </div>
);

export const GarageStatsCards = ({
  className,
  totalSpaces,
  occupiedSpaces,
  availableSpaces,
}: GarageStatsCardsProps): ReactElement => (
  <div className={cn("w-full grid grid-cols-1 gap-3 sm:grid-cols-3", className)}>
    <StatCard
      label="Total de Vagas"
      value={totalSpaces}
      icon={<UsersIcon className="h-5 w-5 text-estapar-icon" />}
    />
    <StatCard
      label="Ocupadas"
      value={occupiedSpaces}
      icon={<UsersIcon className="h-5 w-5 text-estapar-warning" />}
    />
    <StatCard
      label="Disponíveis"
      value={availableSpaces}
      icon={<UsersIcon className="h-5 w-5 text-estapar-success" />}
    />
  </div>
);
