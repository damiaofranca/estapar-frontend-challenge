export type Status = "active" | "inactive"

export interface SelectOption<T = string> {
  label: string
  value: T
}

export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface BaseInputProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
}

export interface BaseComponentProps {
  className?: string
  testId?: string
}

export interface AsyncState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}
