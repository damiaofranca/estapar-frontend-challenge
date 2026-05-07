export interface ApiResponse<T> {
  data: T
  message: string
  originReturn: string
  notification: string[]
}

export interface ApiError {
  codigo: string
  mensagem: string
  complemento: string
}
