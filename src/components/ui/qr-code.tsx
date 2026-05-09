import type { ComponentType, CSSProperties, ReactElement } from "react"
import QRCodeImport from "react-qr-code"

import { cn } from "@/lib/cn"

type QRCodeSvgProps = {
  value: string
  size?: number
  title?: string
  bgColor?: string
  fgColor?: string
  style?: CSSProperties
  level?: "L" | "M" | "Q" | "H"
}

const isRenderableAsComponent = (x: unknown): x is ComponentType<QRCodeSvgProps> => {
  if (typeof x === "function") {
    return true
  }
  if (x == null || typeof x !== "object") {
    return false
  }
  const $$typeof = (x as { $$typeof?: symbol }).$$typeof
  return $$typeof === Symbol.for("react.forward_ref") || $$typeof === Symbol.for("react.memo")
}

const resolveQrCodeComponent = (): ComponentType<QRCodeSvgProps> => {
  let mod: unknown = QRCodeImport
  for (let i = 0; i < 4; i++) {
    if (isRenderableAsComponent(mod)) {
      return mod
    }
    if (mod != null && typeof mod === "object" && "default" in mod) {
      mod = (mod as { default: unknown }).default
      continue
    }
    if (mod != null && typeof mod === "object" && "QRCode" in mod) {
      const named = (mod as { QRCode: unknown }).QRCode
      if (isRenderableAsComponent(named)) {
        return named
      }
    }
    break
  }
  throw new Error("react-qr-code: não foi possível resolver o componente (export ESM/CJS)")
}

const QRCodeSvg = resolveQrCodeComponent()

export type QrCodeProps = {
  value: string
  size?: number
  title?: string
  bgColor?: string
  fgColor?: string
  className?: string
  level?: "L" | "M" | "Q" | "H"
}

export const QrCode = ({
  value,
  title,
  size = 96,
  className,
  level = "M",
  bgColor = "#FFFFFF",
  fgColor = "#000000",
}: QrCodeProps): ReactElement => (
  <div className={cn("bg-estapar-surface", className)}>
    <QRCodeSvg
      value={value}
      level={level}
      title={title}
      bgColor={bgColor}
      fgColor={fgColor}
      style={{ height: size, width: size, maxWidth: "100%" }}
    />
  </div>
)
