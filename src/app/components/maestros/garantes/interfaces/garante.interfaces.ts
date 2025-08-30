export interface Garante {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  cuit_cuil: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface CreateGaranteRequest {
  nombre: string;
  apellido: string;
  dni: string;
  cuit_cuil: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface UpdateGaranteRequest {
  nombre: string;
  apellido: string;
  dni: string;
  cuit_cuil: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}