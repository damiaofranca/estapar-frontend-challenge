import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

import { cn } from "@/lib/cn";

import { Pagination, type PaginationProps } from "./pagination";

export type TableColumnAlign = "left" | "center" | "right";

export type TableColumnFrozen = "start" | "end";

export type TableColumn<T> = {
  key: string;
  width?: string;
  header: ReactNode;
  cellClassName?: string;
  align?: TableColumnAlign;
  headerClassName?: string;
  frozen?: TableColumnFrozen;
  cell: (row: T, rowIndex: number) => ReactNode;
};

export type TableProps<T> = {
  data: T[];
  className?: string;
  emptyMessage?: ReactNode;
  columns: TableColumn<T>[];
  columnsClassName?: string;
  pagination?: PaginationProps;
  onRowClick?: (row: T, rowIndex: number) => void;
  getRowKey: (row: T, rowIndex: number) => string | number;
};

type TruncatableNode = string | number | bigint;

const FROZEN_FALLBACK_WIDTH_PX = 160;

const parseWidthToPx = (width: string | undefined): number | null => {
  if (!width) {
    return null;
  }
  const match = /^(\d+(?:\.\d+)?)px$/.exec(width.trim());
  if (!match) {
    return null;
  }
  return Number.parseFloat(match[1]);
};

const estimateFrozenWidthPx = (width: string | undefined): number =>
  parseWidthToPx(width) ?? FROZEN_FALLBACK_WIDTH_PX;

type StickyOffsets = {
  leftPx: (number | undefined)[];
  rightPx: (number | undefined)[];
  lastFrozenStartIndex: number | undefined;
  firstFrozenEndIndex: number | undefined;
};

const computeStickyOffsets = (
  columns: readonly Pick<TableColumn<unknown>, "width" | "frozen">[],
): StickyOffsets => {
  const n = columns.length;
  const leftPx: (number | undefined)[] = Array.from(
    { length: n },
    () => undefined,
  );
  let accLeft = 0;
  for (let i = 0; i < n; i++) {
    const col = columns[i];
    if (col?.frozen === "start") {
      leftPx[i] = accLeft;
      accLeft += estimateFrozenWidthPx(col.width);
    }
  }

  const rightPx: (number | undefined)[] = Array.from(
    { length: n },
    () => undefined,
  );
  let accRight = 0;
  for (let i = n - 1; i >= 0; i--) {
    const col = columns[i];
    if (col?.frozen === "end") {
      rightPx[i] = accRight;
      accRight += estimateFrozenWidthPx(col.width);
    }
  }

  let lastFrozenStartIndex: number | undefined;
  for (let i = 0; i < n; i++) {
    if (columns[i]?.frozen === "start") {
      if (i === n - 1 || columns[i + 1]?.frozen !== "start") {
        lastFrozenStartIndex = i;
      }
    }
  }

  let firstFrozenEndIndex: number | undefined;
  for (let i = 0; i < n; i++) {
    if (columns[i]?.frozen === "end") {
      firstFrozenEndIndex = i;
      break;
    }
  }

  return { leftPx, rightPx, lastFrozenStartIndex, firstFrozenEndIndex };
};

const isTruncatableNode = (node: ReactNode): node is TruncatableNode =>
  typeof node === "string" ||
  typeof node === "number" ||
  typeof node === "bigint";

const getTruncatableTitle = (node: TruncatableNode): string | undefined => {
  if (typeof node === "string") {
    const trimmed = node.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return String(node);
};

const alignClassName: Record<TableColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

type FrozenCellKind = "head" | "body";

const getFrozenCellClassName = (
  column: Pick<TableColumn<unknown>, "frozen">,
  kind: FrozenCellKind,
): string => {
  const isStart = column.frozen === "start";
  const isEnd = column.frozen === "end";
  if (!isStart && !isEnd) {
    return "";
  }

  const zHead = "z-[21]";
  const zBody = "z-[11]";
  const z = kind === "head" ? zHead : zBody;

  return cn("sticky bg-estapar-surface", z);
};

const getFrozenCellStyle = (
  colIndex: number,
  sticky: StickyOffsets,
): CSSProperties | undefined => {
  const left = sticky.leftPx[colIndex];
  const right = sticky.rightPx[colIndex];
  if (left === undefined && right === undefined) {
    return undefined;
  }
  return {
    left: left !== undefined ? left : undefined,
    right: right !== undefined ? right : undefined,
  };
};

export const Table = <T,>({
  data,
  columns,
  getRowKey,
  className,
  onRowClick,
  pagination,
  columnsClassName,
  emptyMessage = "Nenhum registro encontrado.",
}: TableProps<T>) => {
  const isEmpty = data.length === 0;
  const isInteractive = typeof onRowClick === "function";
  const stickyOffsets = computeStickyOffsets(columns);

  const handleRowKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement>,
    row: T,
    rowIndex: number,
  ): void => {
    if (!isInteractive) {
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onRowClick?.(row, rowIndex);
  };

  const renderCellContent = (node: ReactNode): ReactNode => {
    if (!isTruncatableNode(node)) {
      return node;
    }

    const title = getTruncatableTitle(node);

    return (
      <span title={title} className="block truncate">
        {node}
      </span>
    );
  };

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-lg border border-estapar-border-light bg-estapar-surface",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table
          className={cn(
            "w-full min-w-[720px] table-fixed text-sm",
            columnsClassName,
          )}
        >
          <thead>
            <tr className="border-b border-estapar-border-light">
              {columns.map((column, colIndex) => (
                <th
                  key={column.key}
                  scope="col"
                  style={{
                    ...(column.width ? { width: column.width } : {}),
                    ...getFrozenCellStyle(colIndex, stickyOffsets),
                  }}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-estapar-muted",
                    alignClassName[column.align ?? "left"],
                    column.headerClassName,
                    getFrozenCellClassName(column, "head"),
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isEmpty ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-estapar-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={getRowKey(row, rowIndex)}
                  tabIndex={isInteractive ? 0 : undefined}
                  role={isInteractive ? "button" : undefined}
                  onClick={
                    isInteractive
                      ? () => onRowClick?.(row, rowIndex)
                      : undefined
                  }
                  onKeyDown={
                    isInteractive
                      ? (event) => handleRowKeyDown(event, row, rowIndex)
                      : undefined
                  }
                  className={cn(
                    "border-b border-estapar-border-light last:border-b-0 transition-colors",
                    isInteractive && "group",
                    isInteractive &&
                      "cursor-pointer hover:bg-estapar-muted-surface-alt focus:outline-none focus-visible:bg-estapar-muted-surface-alt",
                  )}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.key}
                      style={getFrozenCellStyle(colIndex, stickyOffsets)}
                      className={cn(
                        "px-4 py-2 text-estapar-body",
                        alignClassName[column.align ?? "left"],
                        column.cellClassName,
                        getFrozenCellClassName(column, "body"),
                        isInteractive &&
                          "group-hover:bg-estapar-muted-surface-alt",
                      )}
                    >
                      {renderCellContent(column.cell(row, rowIndex))}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination ? (
        <Pagination
          {...pagination}
          className={cn(
            "sticky bottom-0 z-10 border-t border-estapar-border-light bg-estapar-surface",
            "rounded-b-lg",
            pagination.className,
          )}
        />
      ) : null}
    </div>
  );
};
