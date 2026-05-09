import { jwtDecode } from "jwt-decode"

import type { DecodedAuthToken } from "@/services/auth/auth-types"

export const tryDecodeAuthTokenClaims = (token: string | null | undefined): DecodedAuthToken | null => {
  const value = token?.trim()
  if (!value) {
    return null
  }
  try {
    return jwtDecode<DecodedAuthToken>(value)
  } catch {
    return null
  }
}
