export interface TipoPropiedad {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Propiedad {
  id: number;
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  idTipoPropiedad: number;
  idTipoPropiedad_fk?: TipoPropiedad;
  superficie: number;
  cantidadAmbientes: number;
  idPropietario: number;
  idPropietario_fk?: {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
  };
}

export interface CreatePropiedadRequest {
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  idTipoPropiedad: number;
  superficie: number;
  cantidadAmbientes: number;
  idPropietario: number;
}

export interface UpdatePropiedadRequest {
  direccion: string;
  ciudad: string;
  provincia: string;
  codigoPostal: string;
  idTipoPropiedad: number;
  superficie: number;
  cantidadAmbientes: number;
  idPropietario: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
}

export interface Propietario {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  cuit_cuil: string;
  telefono: string;
  direccion: string;
}