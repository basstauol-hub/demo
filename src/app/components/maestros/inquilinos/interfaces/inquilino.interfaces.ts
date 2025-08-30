export interface Inquilino {
  id: number
  nombre: string
  apellido: string
  dni: string
  cuit_cuil: string
  telefono: string
  email: string
  direccion: string
}

export interface CreateInquilinoRequest {
  nombre: string
  apellido: string
  dni: string
  cuit_cuil: string
  telefono: string
  email: string
  direccion: string
}

export interface UpdateInquilinoRequest {
  nombre: string
  apellido: string
  dni: string
  cuit_cuil: string
  telefono: string
  email: string
  direccion: string
}

export interface ApiResponse<T> {
  data?: T
  message?: string
  success: boolean
}
