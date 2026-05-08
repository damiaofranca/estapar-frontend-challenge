import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent, ReactElement } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/lib/cn";
import { useAuth, type AuthUser } from "@/hooks/use-auth";
import { ROUTES } from "@/config/constants";
import { PowerIcon } from "@/components/icons/power";
import { useWindowSize } from "@/hooks/use-window-size";
import { GaragesIcon } from "@/components/icons/garage";
import { ChevronIcon } from "@/components/icons/chevron";
import { EstaparIcon } from "@/components/icons/estapar";
import { MensalistasIcon } from "@/components/icons/mensalistas";
import { UserIcon } from "@/components/icons/user";

const SIDEBAR_COLLAPSE_BREAKPOINT_PX = 1024;
const SIDEBAR_EXPANDED_STORAGE_KEY = "estapar.sidebar.expanded";

type MenuItem = {
	key: "garages" | "mensalistas";
	to: string;
	label: string;
	icon: ReactElement;
};

type UseSidebarExpansionReturn = {
	isCollapsedByBreakpoint: boolean;
	isExpanded: boolean;
	handleToggle: () => void;
};

const getStoredSidebarExpanded = (): boolean => {
	if (typeof window === "undefined") {
		return false;
	}

	const raw = window.localStorage.getItem(SIDEBAR_EXPANDED_STORAGE_KEY);
	return raw === "true";
};

const setStoredSidebarExpanded = (isExpanded: boolean): void => {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(SIDEBAR_EXPANDED_STORAGE_KEY, String(isExpanded));
};

const useSidebarExpansion = (): UseSidebarExpansionReturn => {
	const { width } = useWindowSize();
	const isCollapsedByBreakpoint =
		(width ?? Number.POSITIVE_INFINITY) < SIDEBAR_COLLAPSE_BREAKPOINT_PX;
	const [isExpanded, setIsExpanded] = useState(getStoredSidebarExpanded());

	useEffect(() => {
		if (!isCollapsedByBreakpoint) {
			return;
		}

		setIsExpanded(false);
	}, [isCollapsedByBreakpoint]);

	useEffect(() => {
		setStoredSidebarExpanded(isExpanded);
	}, [isExpanded]);

	const handleToggle = (): void => {
		if (isCollapsedByBreakpoint) {
			return;
		}

		setIsExpanded((prev) => !prev);
	};

	return { isCollapsedByBreakpoint, isExpanded, handleToggle };
};

type SidebarToggleButtonProps = {
	isVisible: boolean;
	isExpanded: boolean;
	onToggle: () => void;
};

const SidebarToggleButton = ({
	isVisible,
	isExpanded,
	onToggle,
}: SidebarToggleButtonProps): ReactElement => {
	if (!isVisible) {
		return <></>;
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key !== "Enter" && event.key !== " ") {
			return;
		}

		event.preventDefault();
		onToggle();
	};

	return (
		<button
			tabIndex={0}
			type="button"
			onClick={onToggle}
			onKeyDown={handleKeyDown}
			aria-label="Alternar menu lateral"
			className={cn([
				"absolute right-0 bottom-0 w-8 h-8 flex items-center justify-center rounded-full translate-x-1/2 translate-y-1/2 border border-estapar-border-light bg-white cursor-pointer",
				isExpanded && "rotate-180",
			])}
		>
			<ChevronIcon />
		</button>
	);
};

type SidebarNavItemProps = {
	to: string;
	label: string;
	isActive: boolean;
	icon: ReactElement;
	isExpanded: boolean;
};

const SidebarNavItem = ({
	to,
	icon,
	label,
	isActive,
	isExpanded,
}: SidebarNavItemProps): ReactElement => {
	return (
		<Link
			to={to}
			tabIndex={0}
			aria-label={label}
			aria-current={isActive ? "page" : undefined}
			className={cn([
				"flex items-center justify-between px-4 py-4 hover:bg-estapar-muted-surface-alt",
				"bg-estapar-surface transition-colors",
				isActive ? "text-estapar-primary" : "text-estapar-body ",
				!isExpanded && "justify-center",
			])}
		>
			<div className="flex items-center gap-3">
				<div
					className={cn([
						"flex items-center justify-center rounded-md",
						isActive ? "text-estapar-primary" : "text-estapar-muted",
					])}
				>
					{icon}
				</div>
				<span
					className={cn([
						"text-sm font-medium",
						isActive ? "text-estapar-primary" : "text-estapar-body",
						isExpanded ? "block" : "hidden",
					])}
				>
					{label}
				</span>
			</div>
		</Link>
	);
};

type SidebarProps = {
	pathname: string;
	isExpanded: boolean;
	onToggle: () => void;
	menuItems: MenuItem[];
	isCollapsedByBreakpoint: boolean;
};

const Sidebar = ({
	onToggle,
	pathname,
	menuItems,
	isExpanded,
	isCollapsedByBreakpoint,
}: SidebarProps): ReactElement => {
	const navigate = useNavigate();
	const isExpandedEffective = !isCollapsedByBreakpoint && isExpanded;

	const handleLogoClick = (): void => {
		navigate(ROUTES.HOME);
	};

	const handleLogoKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key !== "Enter" && event.key !== " ") {
			return;
		}

		event.preventDefault();
		handleLogoClick();
	};

	return (
		<aside
			className={cn([
				"w-72 flex flex-col gap-6 border-r border-estapar-border-light bg-estapar-surface transition-all duration-300",
				isExpandedEffective ? "w-72" : "w-16",
			])}
		>
			<div
				className={cn([
					"h-20 flex items-center justify-center border-b border-estapar-border-light relative",
					isExpandedEffective ? "p-6" : "p-0",
				])}
			>
				<button
					type="button"
					tabIndex={0}
					onClick={handleLogoClick}
					onKeyDown={handleLogoKeyDown}
					aria-label="Ir para tela de boas-vindas"
					className={cn([
						"rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring",
						isExpandedEffective ? "p-0" : "p-2",
					])}
				>
					{isExpandedEffective ? (
						<img
							alt="Estapar"
							className="h-8"
							src="/src/assets/estapar-logo.png"
						/>
					) : (
						<EstaparIcon />
					)}
				</button>

				<SidebarToggleButton
					onToggle={onToggle}
					isExpanded={isExpandedEffective}
					isVisible={!isCollapsedByBreakpoint}
				/>
			</div>

			<nav>
				{menuItems.map((item) => {
					const isActive =
						item.key === "garages"
							? pathname === ROUTES.GARAGES
							: pathname === ROUTES.MENSALISTAS;

					return (
						<SidebarNavItem
							to={item.to}
							key={item.key}
							icon={item.icon}
							label={item.label}
							isActive={isActive}
							isExpanded={isExpandedEffective}
						/>
					);
				})}
			</nav>
		</aside>
	);
};

type LogoutButtonProps = {
	onLogout: () => void;
};

const LogoutButton = ({ onLogout }: LogoutButtonProps): ReactElement => {
	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			onLogout();
		}
	};

	return (
		<button
			tabIndex={0}
			type="button"
			aria-label="Sair"
			onClick={onLogout}
			onKeyDown={handleKeyDown}
			className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring cursor-pointer text-estapar-caption"
		>
			<PowerIcon className="h-4 w-4" />
			<span>Sair</span>
		</button>
	);
};

type UserInfoProps = {
	user: AuthUser | null;
};

const UserInfo = ({ user }: UserInfoProps): ReactElement => {
	return (
		<div className="flex items-center gap-1">
			<UserIcon className="h-4 w-4 text-estapar-caption" aria-hidden />
			<span className="text-sm font-medium text-estapar-caption">
				{user?.name ?? "Usuário"}
			</span>
		</div>
	);
};

const AuthenticatedLayout = (): ReactElement => {
	const { user, logout } = useAuth();
	const { pathname } = useLocation();
	const { isCollapsedByBreakpoint, isExpanded, handleToggle } =
		useSidebarExpansion();

	const menuItems = useMemo<MenuItem[]>(
		() => [
			{
				key: "garages",
				to: ROUTES.GARAGES,
				label: "Garagens",
				icon: <GaragesIcon className="h-4 w-4" aria-hidden />,
			},
			{
				key: "mensalistas",
				to: ROUTES.MENSALISTAS,
				label: "Mensalistas",
				icon: <MensalistasIcon className="h-4 w-4" aria-hidden />,
			},
		],
		[],
	);

	return (
		<div className="flex min-h-screen bg-estapar-canvas">
			<Sidebar
				pathname={pathname}
				menuItems={menuItems}
				isExpanded={isExpanded}
				onToggle={handleToggle}
				isCollapsedByBreakpoint={isCollapsedByBreakpoint}
			/>

			<div className="flex min-w-0 flex-1 flex-col">
				<header className="flex h-16 items-center justify-end gap-4 px-4 pt-4 max-lg:px-6!">
					<div className="flex items-center gap-4">
						<UserInfo user={user} />
						<LogoutButton onLogout={logout} />
					</div>
				</header>

				<main className="flex-1 overflow-auto px-12 py-6 pr-4 max-lg:px-6!">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AuthenticatedLayout;
