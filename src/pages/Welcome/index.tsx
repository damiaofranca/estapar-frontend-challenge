import type { ComponentType, ReactElement, SVGProps } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/cn";
import { ROUTES } from "@/config/constants";
import { GaragesIcon } from "@/components/icons/garage";
import { MensalistasIcon } from "@/components/icons/mensalistas";
import { ChevronRightIcon } from "@/components/icons/chevron-right";

type WelcomeCardConfig = {
	to: string;
	title: string;
	description: string;
	Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type WelcomeCardProps = WelcomeCardConfig;

const WELCOME_CARDS = [
	{
		title: "Garagens",
		Icon: GaragesIcon,
		to: ROUTES.GARAGES,
		description: "Veja a lista de garagens disponíveis e suas configurações.",
	},
	{
		title: "Mensalistas",
		Icon: MensalistasIcon,
		to: ROUTES.MENSALISTAS,
		description:
			"Contrate vagas adicionais para seus funcionários ou visitantes.",
	},
];

const WelcomeCard = ({
	to,
	title,
	description,
	Icon,
}: WelcomeCardProps): ReactElement => (
	<Link
		to={to}
		aria-label={`Ir para ${title}`}
		className={cn([
			"group relative block w-full rounded-lg border border-estapar-border bg-estapar-surface p-6 shadow-sm shadow-estapar-border-light/80",
			"transition-colors hover:bg-estapar-muted-surface-alt",
			"focus:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring",
		])}
	>
		<div className="absolute right-6 top-6 text-estapar-muted group-hover:text-estapar-body">
			<ChevronRightIcon />
		</div>

		<div className="flex flex-col gap-3">
			<div className="text-estapar-primary">
				<Icon className="h-6 w-6" aria-hidden />
			</div>

			<div className="flex flex-col gap-1">
				<h2 className="text-sm font-semibold text-estapar-dark-blue">
					{title}
				</h2>
				<p className="text-xs leading-relaxed text-estapar-dark-gray">
					{description}
				</p>
			</div>
		</div>
	</Link>
);

const WelcomePage = (): ReactElement => (
	<div className="w-full max-w-5xl">
		<header className="flex flex-col gap-3">
			<h1 className="text-2xl font-semibold tracking-tight text-estapar-medium-gray">
				Bem-vindo ao Portal Estapar B2B
			</h1>
			<p className="max-w-2xl text-sm leading-relaxed text-estapar-dark-gray">
				Gerencie seus serviços de estacionamento, acesse relatórios, configure
				credenciais e contrate planos de mensalidade em um só lugar.
			</p>
		</header>

		<section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
			{WELCOME_CARDS.map((card) => (
				<WelcomeCard key={card.to} {...card} />
			))}
		</section>
	</div>
);

export default WelcomePage;
