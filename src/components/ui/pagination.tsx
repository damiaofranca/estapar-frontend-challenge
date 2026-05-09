import type { ReactElement } from "react"

import { ChevronLeftSmallIcon } from "@/components/icons/chevron-left-small"
import { ChevronRightSmallIcon } from "@/components/icons/chevron-right-small"
import { cn } from "@/lib/cn"

const PAGINATION_ELLIPSIS = "ellipsis"

type PaginationItem = number | typeof PAGINATION_ELLIPSIS

export type PaginationProps = {
	pageIndex: number
	pageSize: number
	totalCount: number
	siblingCount?: number
	className?: string
	onPageChange: (pageIndex: number) => void
}

const range = (start: number, end: number): number[] => {
	const length = end - start + 1
	return Array.from({ length }, (_, i) => start + i)
}

const getPaginationItems = (
	pageCount: number,
	currentPage: number,
	siblingCount: number,
): PaginationItem[] => {
	const totalPageNumbers = siblingCount * 2 + 5

	if (pageCount <= totalPageNumbers) {
		return range(1, pageCount)
	}

	const leftSibling = Math.max(currentPage - siblingCount, 1)
	const rightSibling = Math.min(currentPage + siblingCount, pageCount)

	const showLeftEllipsis = leftSibling > 2
	const showRightEllipsis = rightSibling < pageCount - 1

	if (!showLeftEllipsis && showRightEllipsis) {
		const leftItemCount = 3 + 2 * siblingCount
		return [...range(1, leftItemCount), PAGINATION_ELLIPSIS, pageCount]
	}

	if (showLeftEllipsis && !showRightEllipsis) {
		const rightItemCount = 3 + 2 * siblingCount
		return [1, PAGINATION_ELLIPSIS, ...range(pageCount - rightItemCount + 1, pageCount)]
	}

	return [
		1,
		PAGINATION_ELLIPSIS,
		...range(leftSibling, rightSibling),
		PAGINATION_ELLIPSIS,
		pageCount,
	]
}

const buttonBaseClassName =
	"inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-estapar-border-light bg-estapar-surface px-2 text-sm font-medium text-estapar-body transition-colors hover:bg-estapar-muted-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"

const buttonActiveClassName =
	"border-estapar-primary bg-estapar-primary text-estapar-surface hover:bg-estapar-primary-hover"

export const Pagination = ({
	pageIndex,
	pageSize,
	totalCount,
	className,
	onPageChange,
	siblingCount = 1,
}: PaginationProps): ReactElement | null => {
	const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))
	const currentPage = pageIndex + 1
	const isFirst = currentPage <= 1
	const isLast = currentPage >= pageCount

	const items = getPaginationItems(pageCount, currentPage, siblingCount)

	const rangeStart = totalCount === 0 ? 0 : pageIndex * pageSize + 1
	const rangeEnd = Math.min(totalCount, (pageIndex + 1) * pageSize)

	const handleGoTo = (nextPage: number): void => {
		const clamped = Math.max(1, Math.min(pageCount, nextPage))
		onPageChange(clamped - 1)
	}

	return (
		<nav
			aria-label="Paginação"
			className={cn(
				"flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			<p className="text-xs text-estapar-muted">
				Mostrando <span className="font-medium text-estapar-body">{rangeStart}</span>
				{" - "}
				<span className="font-medium text-estapar-body">{rangeEnd}</span>
				{" de "}
				<span className="font-medium text-estapar-body">{totalCount}</span>
				{" registros"}
			</p>
			<ul className="flex items-center gap-1">
				<li>
					<button
						type="button"
						disabled={isFirst}
						aria-label="Página anterior"
						onClick={() => handleGoTo(currentPage - 1)}
						className={buttonBaseClassName}
					>
						<ChevronLeftSmallIcon className="h-4 w-4" />
					</button>
				</li>
				{items.map((item, index) => {
					if (item === PAGINATION_ELLIPSIS) {
						return (
							<li key={`ellipsis-${index}`}>
								<span
									aria-hidden
									className="inline-flex h-8 min-w-8 items-center justify-center px-2 text-sm text-estapar-muted"
								>
									…
								</span>
							</li>
						)
					}
					const isActive = item === currentPage
					return (
						<li key={item}>
							<button
								type="button"
								aria-label={`Ir para a página ${item}`}
								aria-current={isActive ? "page" : undefined}
								onClick={() => handleGoTo(item)}
								className={cn(buttonBaseClassName, isActive ? buttonActiveClassName : undefined)}
							>
								{item}
							</button>
						</li>
					)
				})}
				<li>
					<button
						type="button"
						disabled={isLast}
						aria-label="Próxima página"
						onClick={() => handleGoTo(currentPage + 1)}
						className={buttonBaseClassName}
					>
						<ChevronRightSmallIcon className="h-4 w-4" />
					</button>
				</li>
			</ul>
		</nav>
	)
}
