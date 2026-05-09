import type { ReactElement } from "react"

export type EstaparLogoProps = {
	className?: string
}

export const EstaparLogo = ({ className }: EstaparLogoProps): ReactElement => {
	return (
		<div
			className={["flex items-center justify-center gap-3", className].filter(Boolean).join(" ")}
			aria-label="Estapar"
		>
			<svg
				width={48}
				height={48}
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden
			>
				<rect width={48} height={48} rx={12} fill="url(#estapar-mark-gradient)" />
				<path
					d="M14 34V14h11c5.2 0 8 3.1 8 7.5 0 4.4-2.8 7.5-8 7.5h-5v5H14zm9.5-12c2.2 0 3.5-1.2 3.5-3.2 0-2-1.3-3.3-3.5-3.3H19v6.5h4.5z"
					fill="white"
				/>
				<defs>
					<linearGradient
						id="estapar-mark-gradient"
						x1={10}
						y1={8}
						x2={40}
						y2={42}
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="var(--color-estapar-green-dark)" />
						<stop offset={1} stopColor="var(--color-estapar-lime-light)" />
					</linearGradient>
				</defs>
			</svg>
			<span className="select-none text-[26px] font-bold leading-none tracking-tight text-estapar-title">
				ESTAPAR
			</span>
		</div>
	)
}
