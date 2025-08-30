// propietario.interfaces.ts

export interface Propietario {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  cuit_cuil: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaCreacion?: Date;
  fechaModificacion?: Date;
  // Campos opcionales para estadísticas
  cantidadPropiedades?: number;
  contratosActivos?: number;
  ingresosMensuales?: number;
}

export interface CreatePropietarioRequest {
  nombre: string;
  apellido: string;
  dni: string;
  cuit_cuil?: string;
  telefono?: string;
  email: string;
  direccion?: string;
}

export interface UpdatePropietarioRequest {
  nombre: string;
  apellido: string;
  dni: string;
  cuit_cuil?: string;
  telefono?: string;
  email: string;
  direccion?: string;
}

export interface PropietarioWithStats extends Propietario {
  stats: {
    propiedades: number;
    contratosActivos: number;
    ingresosMensuales: number;
    totalIngresos: number;
    promedioRenta: number;
  };
}

export interface PropietarioSearchResult {
  propietarios: Propietario[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

// Enums para validaciones
export enum DocumentType {
  DNI = 'DNI',
  CUIT = 'CUIT',
  CUIL = 'CUIL'
}

// Tipos auxiliares
export type PropietarioFormData = Omit<Propietario, 'id' | 'fechaCreacion' | 'fechaModificacion'>;

export interface PropietarioFilter {
  searchTerm?: string;
  hasPhone?: boolean;
  hasAddress?: boolean;
  hasCuitCuil?: boolean;
}

// Interface extendida para el selector de propietarios
export interface PropietarioSelectorOption {
  id: number;
  label: string;
  sublabel: string;
  avatar: string;
  propietario: Propietario;
}

// Para reportes y estadísticas
export interface PropietarioReport {
  totalPropietarios: number;
  conTelefono: number;
  conDireccion: number;
  conCuitCuil: number;
  promedioPropiedad: number;
}
