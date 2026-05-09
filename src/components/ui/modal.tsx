import { useEffect, useRef, type MouseEvent, type ReactElement, type ReactNode } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/cn"
import { XIcon } from "@/components/icons/x"

import { Typography } from "./typography"

export type ModalSize = "sm" | "md" | "lg"

const modalSizeClassName: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
}

export type ModalProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  size?: ModalSize
  className?: string
  bodyClassName?: string
  closeOnOverlayClick?: boolean
  showCloseButton?: boolean
  ariaLabel?: string
}

export const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  className,
  bodyClassName,
  size = "md",
  ariaLabel,
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps): ReactElement | null => {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const previouslyFocused = document.activeElement as HTMLElement | null
    dialogRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>): void => {
    if (!closeOnOverlayClick) {
      return
    }
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div
      role="presentation"
      onMouseDown={handleOverlayMouseDown}
      className="fixed inset-0 z-1100 flex items-center justify-center bg-estapar-overlay px-4 py-6"
    >
      <div
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-label={typeof title === "string" ? title : ariaLabel}
        className={cn(
          "relative flex max-h-full w-full flex-col rounded-xl bg-estapar-surface shadow-xl outline-none",
          modalSizeClassName[size],
          className,
        )}
      >
        {(title != null || description != null || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6">
            <div className="flex flex-col gap-1">
              {title != null ? (
                <Typography as="h2" className="text-lg font-semibold text-estapar-dark-blue">
                  {title}
                </Typography>
              ) : null}
              {description != null ? (
                <Typography as="p" className="text-sm text-estapar-caption">
                  {description}
                </Typography>
              ) : null}
            </div>
            {showCloseButton ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar modal"
                className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-estapar-muted transition-colors hover:bg-estapar-muted-surface-alt hover:text-estapar-body focus:outline-none focus-visible:ring-2 focus-visible:ring-estapar-ring"
              >
                <XIcon className="h-5 w-5" />
              </button>
            ) : null}
          </div>
        )}

        <div className={cn("flex-1 overflow-y-auto px-6 py-5", bodyClassName)}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
